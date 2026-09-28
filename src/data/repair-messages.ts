import type { Language } from "~/i18n/types";

export type RepairMessageCopy = { title: string; body: string; action: string };

export type RepairMessage = {
  fireworks?: boolean;
  copy: Record<Language, RepairMessageCopy>;
};

// Counts are the total AFTER completing a new repair, regardless of repair order.
// Omit a count or set it to null for no popup. Set allRepaired to null to disable
// the final popup. The final setting takes precedence over a numbered message.
export const repairMessages: {
  afterRepairs: Partial<Record<number, RepairMessage | null>>;
  allRepaired: RepairMessage | null;
} = {
  afterRepairs: {
    1: {
      copy: {
        nl: {
          title: "Je eerste reparatie is gelukt!",
          body: "Goed gedaan! De trein komt weer tot leven. Zoek de volgende QR-code en help nog een onderdeel op weg.",
          action: "Verder ontdekken",
        },
        fr: {
          title: "Première réparation réussie !",
          body: "Bravo ! Le train reprend vie. Trouve le prochain code QR et remets une autre pièce en marche.",
          action: "Continuer l’exploration",
        },
      },
    },
    2: {
      copy: {
        nl: {
          title: "Twee reparaties, goed bezig!",
          body: "Dankzij jou werkt er steeds meer aan de trein. Blijf speuren naar QR-codes: je bent op de goede weg!",
          action: "Op naar de volgende",
        },
        fr: {
          title: "Deux réparations, bravo !",
          body: "Grâce à toi, le train fonctionne de mieux en mieux. Continue à chercher les codes QR : tu es sur la bonne voie !",
          action: "Passer à la suivante",
        },
      },
    },
  },
  allRepaired: {
    fireworks: true,
    copy: {
      nl: {
        title: "Hoera, je hebt de trein gered!",
        body: "Alle onderdelen zijn gerepareerd. Dankzij jouw speurwerk is de trein weer klaar voor vertrek. Geweldig gedaan, treinheld!",
        action: "Bekijk jouw trein",
      },
      fr: {
        title: "Hourra, tu as sauvé le train !",
        body: "Toutes les pièces sont réparées. Grâce à tes découvertes, le train est prêt à repartir. Bravo, héros du train !",
        action: "Voir ton train",
      },
    },
  },
};

export function getRepairMessage(
  completedCount: number,
  totalCount: number,
): RepairMessage | undefined {
  return (
    (completedCount === totalCount
      ? repairMessages.allRepaired
      : repairMessages.afterRepairs[completedCount]) ?? undefined
  );
}
