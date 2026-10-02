import type { RepairId } from "~/data/repairs";
import type { Translations } from "~/i18n/types";
import repairContent from "~/i18n/repair-content.generated.json";

export const fr: Translations<RepairId> = {
  ui: {
    documentTitle: "Explorateur de trains SNCB",
    languageSelector: "Choisir la langue",
    dutch: "Néerlandais",
    french: "Français",
    headerEyebrow: "Sauvetage du train SNCB",
    headerTitle: "Redonne vie au train",
    progressLabel: (completed, total) =>
      `${completed} ${completed === 1 ? "réparation" : "réparations"} sur ${total} ${completed === 1 ? "terminée" : "terminées"}`,
    welcomeTitle: "Trouve les repères dans la gare",
    welcomeDescription:
      "Scannez un code QR pour une réparation et découvrez plus d’informations sur la partie du train.",
    tourLabel: "Parcours de réparation du train",
    tourIntro:
      "Suis le train de la cabine à la voiture. Scanne un repère dans la gare pour réparer la pièce correspondante.",
    repaired: "Réparé",
    awaitingRepair: "À réparer",
    viewComponentInfo: "Voir les infos sur la pièce",
    scan: "Scanne",
    qrCode: "Code QR",
    resetProgress: "Effacer la progression locale",
    resetConfirmation:
      "Effacer toutes les réparations ? Tu devras ensuite réparer les pièces à nouveau.",
    repairLabel: (title) => `Réparation de ${title}`,
    closeRepairDetails: "Fermer les détails de la réparation",
    closeRepairMessage: "Fermer le message de réparation",
    repairComplete: "RÉPARATION TERMINÉE",
    repairPending: "À RÉPARER",
    completedSummary:
      "Cette pièce fonctionne à nouveau. Continue ton exploration pour réparer le reste du train.",
    learnMore: "En savoir plus",
    alreadyRepaired: "✓ Cette pièce est déjà réparée.",
    repairAction: "Réparer cette pièce",
    notFoundEyebrow: "MAUVAIS QUAI",
    notFoundTitle: "Cet arrêt ne fait pas partie du parcours.",
    notFoundAction: "Retourner au sauvetage du train",
  },
  repairs: {
    painting: {
      title: repairContent.painting.title.fr,
      summary: "Découvre comment sont appliquées les couleurs reconnaissables des trains SNCB.",
      fact: repairContent.painting.details.fr,
    },
    "drivers-cab": {
      title: repairContent["drivers-cab"].title.fr,
      summary: "Répare les commandes qui aident le conducteur à mener chaque trajet à bon port.",
      fact: repairContent["drivers-cab"].details.fr,
    },
    headlights: {
      title: repairContent.headlights.title.fr,
      summary: "Rallume les phares qui éclairent la voie devant le train.",
      fact: repairContent.headlights.details.fr,
    },
    "brake-system": {
      title: repairContent["brake-system"].title.fr,
      summary: "Répare le système qui permet au train de s’arrêter en toute sécurité.",
      fact: repairContent["brake-system"].details.fr,
    },
    wheels: {
      title: repairContent.wheels.title.fr,
      summary: "Prépare les roues pour que le train roule sans à-coups sur les rails.",
      fact: repairContent.wheels.details.fr,
    },
    "passenger-doors": {
      title: repairContent["passenger-doors"].title.fr,
      summary: "Répare les portes pour que tout le monde puisse monter en sécurité.",
      fact: repairContent["passenger-doors"].details.fr,
    },
    "roof-ventilation": {
      title: repairContent["roof-ventilation"].title.fr,
      summary: "Fais à nouveau circuler l’air frais dans la voiture.",
      fact: repairContent["roof-ventilation"].details.fr,
    },
    electronics: {
      title: repairContent.electronics.title.fr,
      summary:
        "Découvre comment l’électronique assure le fonctionnement fiable des systèmes à bord.",
      fact: repairContent.electronics.details.fr,
    },
  },
};
