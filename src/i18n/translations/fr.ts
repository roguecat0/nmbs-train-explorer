import type { RepairId } from "~/data/repairs";
import type { Translations } from "~/i18n/types";

export const fr: Translations<RepairId> = {
  ui: {
    documentTitle: "Explorateur de trains SNCB",
    languageSelector: "Choisir la langue",
    dutch: "Néerlandais",
    french: "Français",
    headerEyebrow: "Sauvetage du train SNCB",
    headerTitle: "Redonne vie au train",
    progressLabel: (completed, total) => `${completed} réparations sur ${total} terminées`,
    welcomeTitle: "Trouve les repères dans la gare",
    welcomeDescription:
      "Scanne le code QR d’une réparation et découvre la prochaine partie du train.",
    tourLabel: "Parcours de réparation du train",
    tourIntro:
      "Suis le train de la cabine à la voiture. Scanne un repère dans la gare pour réparer la pièce correspondante.",
    repaired: "Réparé",
    awaitingRepair: "À réparer",
    viewComponentInfo: "Voir les infos sur la pièce",
    componentImageAlt: "Illustration d’une pièce de train",
    scan: "Scanne",
    qrCode: "Code QR",
    resetProgress: "Effacer la progression locale",
    repairLabel: (title) => `Réparation de ${title}`,
    closeRepairDetails: "Fermer les détails de la réparation",
    repairComplete: "RÉPARATION TERMINÉE",
    latestScan: "TON DERNIER SCAN",
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
    "drivers-cab": {
      title: "Cabine de conduite",
      section: "Avant du train",
      summary: "Répare les commandes qui aident le conducteur à mener chaque trajet à bon port.",
      fact: "La cabine est le centre de commande du train.",
    },
    headlights: {
      title: "Phares",
      section: "Avant du train",
      summary: "Rallume les phares qui éclairent la voie devant le train.",
      fact: "Des phares puissants permettent de bien voir le train.",
    },
    "brake-system": {
      title: "Système de freinage",
      section: "Voiture motrice",
      summary: "Répare le système qui permet au train de s’arrêter en toute sécurité.",
      fact: "Toutes les voitures agissent ensemble lorsque le train freine.",
    },
    wheels: {
      title: "Roues",
      section: "Voiture motrice",
      summary: "Prépare les roues pour que le train roule sans à-coups sur les rails.",
      fact: "Des roues en acier roulent sur des rails en acier.",
    },
    "passenger-doors": {
      title: "Portes voyageurs",
      section: "Voiture voyageurs",
      summary: "Répare les portes pour que tout le monde puisse monter en sécurité.",
      fact: "Les portes d’un train sont conçues pour fonctionner ensemble.",
    },
    "roof-ventilation": {
      title: "Ventilation du toit",
      section: "Voiture voyageurs",
      summary: "Fais à nouveau circuler l’air frais dans la voiture.",
      fact: "Les équipements installés sur le toit d’un train cachent bien leur jeu.",
    },
  },
};
