import type { RepairId } from "~/data/repairs";
import type { Translations } from "~/i18n/types";

export const nl: Translations<RepairId> = {
  ui: {
    documentTitle: "NMBS Treinverkenner",
    languageSelector: "Taal kiezen",
    dutch: "Nederlands",
    french: "Frans",
    headerEyebrow: "NMBS-treinredding",
    headerTitle: "Breng de trein weer tot leven",
    progressLabel: (completed, total) => `${completed} van ${total} reparaties voltooid`,
    welcomeTitle: "Vind de stationsmarkeringen",
    welcomeDescription: "Scan een QR-code voor een reparatie en ontdek het volgende treindeel.",
    tourLabel: "Reparatieronde van de trein",
    tourIntro:
      "Volg de trein van de cabine tot het rijtuig. Scan een stationsmarkering om het bijbehorende onderdeel te repareren.",
    repaired: "Gerepareerd",
    awaitingRepair: "Wacht op reparatie",
    viewComponentInfo: "Bekijk info over het onderdeel",
    componentImageAlt: "Illustratie van een treinonderdeel",
    scan: "Scan",
    qrCode: "QR-code",
    resetProgress: "Lokale voortgang wissen",
    repairLabel: (title) => `Reparatie van ${title}`,
    closeRepairDetails: "Reparatiedetails sluiten",
    repairComplete: "REPARATIE VOLTOOID",
    latestScan: "JE LAATSTE SCAN",
    completedSummary:
      "Dit onderdeel werkt weer. Ga verder op ontdekking en herstel de rest van de trein.",
    learnMore: "Meer ontdekken",
    justRepaired: "✓ Je hebt dit onderdeel gerepareerd!",
    alreadyRepaired: "✓ Dit onderdeel is al gerepareerd.",
    repairAction: "Repareer dit onderdeel",
    notFoundEyebrow: "VERKEERD PERRON",
    notFoundTitle: "Deze halte ligt niet op de route.",
    notFoundAction: "Terug naar de treinredding",
  },
  repairs: {
    "drivers-cab": {
      title: "Bestuurderscabine",
      section: "Voorkant van de trein",
      summary: "Herstel de bediening waarmee de treinbestuurder elke rit in goede banen leidt.",
      fact: "De cabine is het commandocentrum van de trein.",
    },
    headlights: {
      title: "Koplampen",
      section: "Voorkant van de trein",
      summary: "Laat de koplampen opnieuw schijnen op het spoor voor de trein.",
      fact: "Felle lampen zorgen ervoor dat de trein goed zichtbaar is.",
    },
    "brake-system": {
      title: "Remsysteem",
      section: "Motorwagen",
      summary: "Herstel het systeem waarmee de trein veilig tot stilstand komt.",
      fact: "Bij het remmen werken alle rijtuigen van een trein samen.",
    },
    wheels: {
      title: "Wielen",
      section: "Motorwagen",
      summary: "Maak de wielen klaar om de trein soepel over de rails te laten rijden.",
      fact: "Stalen wielen rijden op stalen rails.",
    },
    "passenger-doors": {
      title: "Reizigersdeuren",
      section: "Reizigersrijtuig",
      summary: "Repareer de deuren zodat iedereen veilig kan instappen.",
      fact: "De deuren van een trein zijn ontworpen om samen te werken.",
    },
    "roof-ventilation": {
      title: "Dakventilatie",
      section: "Reizigersrijtuig",
      summary: "Laat opnieuw frisse lucht door het rijtuig stromen.",
      fact: "De apparatuur op het dak van een trein doet meer dan je op het eerste gezicht ziet.",
    },
  },
};
