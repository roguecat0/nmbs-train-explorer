#!/usr/bin/env python3
"""Import repair titles and long descriptions from the translation workbook."""

import json
import re
import sys
import zipfile
from pathlib import Path
from xml.etree import ElementTree


NAMESPACE = {"a": "http://schemas.openxmlformats.org/spreadsheetml/2006/main", "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships"}
OLD_TITLE_IDS = {
    "Bestuurderscabine": "drivers-cab",
    "Koplampen": "headlights",
    "Remsysteem": "brake-system",
    "Wielen": "wheels",
    "Reizigersdeuren": "passenger-doors",
    "Dakventilatie": "roof-ventilation",
}
NEW_LOCATION_IDS = {3: "painting", 15: "electronics"}
EXPECTED_HEADERS = [
    "Route locatie",
    "Titel oud",
    "Titel NL",
    "Titel FR",
    "Meer ontdekken (NL) lange versie",
    "Meer ontdekken (FR) lange versie",
]


def cell_value(cell: ElementTree.Element, shared_strings: list[str]) -> str:
    value = cell.find("a:v", NAMESPACE)
    if value is None:
        inline_text = cell.findall(".//a:t", NAMESPACE)
        return "".join(part.text or "" for part in inline_text).strip()
    text = value.text or ""
    if cell.attrib.get("t") == "s":
        return shared_strings[int(text)].strip()
    return text.strip()


def load_sheet(workbook: Path) -> list[dict[str, str]]:
    with zipfile.ZipFile(workbook) as archive:
        workbook_root = ElementTree.fromstring(archive.read("xl/workbook.xml"))
        relationships = ElementTree.fromstring(archive.read("xl/_rels/workbook.xml.rels"))
        relationship_targets = {
            relation.attrib["Id"]: relation.attrib["Target"] for relation in relationships
        }
        first_sheet = workbook_root.find("a:sheets/a:sheet", NAMESPACE)
        if first_sheet is None:
            raise ValueError("The workbook has no worksheets.")
        target = relationship_targets[first_sheet.attrib[f"{{{NAMESPACE['r']}}}id"]]
        sheet_path = target if target.startswith("xl/") else f"xl/{target}"
        sheet_root = ElementTree.fromstring(archive.read(sheet_path))
        shared_strings: list[str] = []
        if "xl/sharedStrings.xml" in archive.namelist():
            shared_root = ElementTree.fromstring(archive.read("xl/sharedStrings.xml"))
            shared_strings = [
                "".join(text.text or "" for text in item.findall(".//a:t", NAMESPACE))
                for item in shared_root.findall("a:si", NAMESPACE)
            ]

    row_values: list[list[str]] = []
    for row in sheet_root.findall(".//a:sheetData/a:row", NAMESPACE):
        values: list[str] = []
        for cell in row.findall("a:c", NAMESPACE):
            column = re.match(r"[A-Z]+", cell.attrib["r"])
            if column is None:
                continue
            column_index = 0
            for letter in column.group():
                column_index = column_index * 26 + ord(letter) - ord("A") + 1
            while len(values) < column_index:
                values.append("")
            values[column_index - 1] = cell_value(cell, shared_strings)
        row_values.append(values)

    if not row_values or row_values[0][: len(EXPECTED_HEADERS)] != EXPECTED_HEADERS:
        raise ValueError(f"Expected workbook headings: {', '.join(EXPECTED_HEADERS)}")
    return [dict(zip(EXPECTED_HEADERS, row)) for row in row_values[1:] if any(row)]


def clean_multiline(value: str) -> str:
    return "\n".join(line.rstrip() for line in value.replace("\r\n", "\n").split("\n")).strip()


def convert(workbook: Path) -> dict[str, dict[str, dict[str, str]]]:
    repairs: dict[str, dict[str, dict[str, str]]] = {}
    for row in load_sheet(workbook):
        old_title = row["Titel oud"].strip()
        if old_title in OLD_TITLE_IDS:
            repair_id = OLD_TITLE_IDS[old_title]
        else:
            repair_id = NEW_LOCATION_IDS.get(int(row["Route locatie"]))
        if repair_id is None:
            raise ValueError(f"No repair mapping for old title {old_title!r} at route location {row['Route locatie']!r}.")
        repairs[repair_id] = {
            "title": {"nl": row["Titel NL"].strip(), "fr": row["Titel FR"].strip()},
            "details": {
                "nl": clean_multiline(row["Meer ontdekken (NL) lange versie"]),
                "fr": clean_multiline(row["Meer ontdekken (FR) lange versie"]),
            },
        }

    expected_ids = set(OLD_TITLE_IDS.values()) | set(NEW_LOCATION_IDS.values())
    if set(repairs) != expected_ids:
        raise ValueError(f"Workbook mapped {sorted(repairs)}; expected {sorted(expected_ids)}.")
    return repairs


def main() -> None:
    if len(sys.argv) != 2:
        raise SystemExit("Usage: python3 scripts/import-translations.py translation_texts.xlsx")
    workbook = Path(sys.argv[1])
    output = Path("src/i18n/repair-content.generated.json")
    output.write_text(json.dumps(convert(workbook), ensure_ascii=False, indent=2) + "\n")
    print(f"Wrote {output}")


if __name__ == "__main__":
    main()
