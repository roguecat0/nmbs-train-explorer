import type { RepairId } from "~/data/repairs";
import type { Translations } from "~/i18n/types";
import repairContent from "~/i18n/repair-content.generated.json";

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
    welcomeDescription:
      "Scan een QR-code voor een reparatie en ontdek meer informatie over het treindeel.",
    tourLabel: "Reparatieronde van de trein",
    tourIntro:
      "Volg de trein van de cabine tot het rijtuig. Scan een stationsmarkering om het bijbehorende onderdeel te repareren.",
    repaired: "Gerepareerd",
    awaitingRepair: "Wacht op reparatie",
    viewComponentInfo: "Bekijk info over het onderdeel",
    scan: "Scan",
    qrCode: "QR-code",
    resetProgress: "Lokale voortgang wissen",
    resetConfirmation: "Alle reparaties wissen? Je moet de onderdelen daarna opnieuw repareren.",
    repairLabel: (title) => `Reparatie van ${title}`,
    closeRepairDetails: "Reparatiedetails sluiten",
    closeRepairMessage: "Reparatiebericht sluiten",
    repairComplete: "REPARATIE VOLTOOID",
    repairPending: "TE REPAREREN",
    completedSummary:
      "Dit onderdeel werkt weer. Ga verder op ontdekking en herstel de rest van de trein.",
    learnMore: "Meer ontdekken",
    alreadyRepaired: "✓ Dit onderdeel is al gerepareerd.",
    repairAction: "Repareer dit onderdeel",
    notFoundEyebrow: "VERKEERD PERRON",
    notFoundTitle: "Deze halte ligt niet op de route.",
    notFoundAction: "Terug naar de treinredding",
  },
  repairs: {
    painting: {
      title: repairContent.painting.title.nl,
      summary: "Ontdek hoe de herkenbare kleuren van de NMBS-trein worden aangebracht.",
      fact: repairContent.painting.details.nl,
    },
    "drivers-cab": {
      title: repairContent["drivers-cab"].title.nl,
      summary: "Herstel de bediening waarmee de treinbestuurder elke rit in goede banen leidt.",
      fact: repairContent["drivers-cab"].details.nl,
    },
    headlights: {
      title: repairContent.headlights.title.nl,
      summary: "Laat de koplampen opnieuw schijnen op het spoor voor de trein.",
      fact: repairContent.headlights.details.nl,
    },
    "brake-system": {
      title: repairContent["brake-system"].title.nl,
      summary: "Herstel het systeem waarmee de trein veilig tot stilstand komt.",
      fact: repairContent["brake-system"].details.nl,
    },
    wheels: {
      title: repairContent.wheels.title.nl,
      summary: "Maak de wielen klaar om de trein soepel over de rails te laten rijden.",
      fact: repairContent.wheels.details.nl,
    },
    "passenger-doors": {
      title: repairContent["passenger-doors"].title.nl,
      summary: "Repareer de deuren zodat iedereen veilig kan instappen.",
      fact: repairContent["passenger-doors"].details.nl,
    },
    "roof-ventilation": {
      title: repairContent["roof-ventilation"].title.nl,
      summary: "Laat opnieuw frisse lucht door het rijtuig stromen.",
      fact: repairContent["roof-ventilation"].details.nl,
    },
    electronics: {
      title: repairContent.electronics.title.nl,
      summary: "Ontdek hoe elektronica de systemen aan boord veilig en betrouwbaar laat werken.",
      fact: repairContent.electronics.details.nl,
    },
  },
};
