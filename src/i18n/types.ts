export type Language = "nl" | "fr";

export type RepairCopy = {
  title: string;
  section: string;
  summary: string;
  fact: string;
};

export type UiTranslations = {
  documentTitle: string;
  languageSelector: string;
  dutch: string;
  french: string;
  headerEyebrow: string;
  headerTitle: string;
  progressLabel: (completed: number, total: number) => string;
  welcomeTitle: string;
  welcomeDescription: string;
  tourLabel: string;
  tourIntro: string;
  repaired: string;
  awaitingRepair: string;
  viewComponentInfo: string;
  componentImageAlt: string;
  scan: string;
  qrCode: string;
  resetProgress: string;
  repairLabel: (title: string) => string;
  closeRepairDetails: string;
  repairComplete: string;
  latestScan: string;
  completedSummary: string;
  learnMore: string;
  alreadyRepaired: string;
  repairAction: string;
  notFoundEyebrow: string;
  notFoundTitle: string;
  notFoundAction: string;
};

export type Translations<RepairId extends string> = {
  ui: UiTranslations;
  repairs: Record<RepairId, RepairCopy>;
};
