import {
  createContext,
  createEffect,
  createSignal,
  useContext,
  type JSX,
  type ParentProps,
} from "solid-js";
import type { RepairId } from "~/data/repairs";
import { fr } from "~/i18n/translations/fr";
import { nl } from "~/i18n/translations/nl";
import type { Language, RepairCopy, UiTranslations } from "~/i18n/types";

const STORAGE_KEY = "train-explorer-language";
const DEFAULT_LANGUAGE: Language = "nl";
const translations = { nl, fr };

type LanguageContextValue = {
  language: () => Language;
  setLanguage: (language: Language) => void;
  ui: () => UiTranslations;
  repair: (repairId: RepairId) => RepairCopy;
};

const LanguageContext = createContext<LanguageContextValue>();

function isLanguage(value: string | null): value is Language {
  return value === "nl" || value === "fr";
}

function readStoredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLanguage(stored) ? stored : DEFAULT_LANGUAGE;
  } catch {
    return DEFAULT_LANGUAGE;
  }
}

export function LanguageProvider(props: ParentProps): JSX.Element {
  const [language, setLanguageSignal] = createSignal<Language>(readStoredLanguage());

  createEffect(() => {
    const selectedLanguage = language();
    document.documentElement.lang = selectedLanguage;
    document.title = translations[selectedLanguage].ui.documentTitle;
  });

  const setLanguage = (nextLanguage: Language): void => {
    setLanguageSignal(nextLanguage);
    try {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage);
    } catch {
      // The in-memory preference still works when storage is unavailable.
    }
  };

  const value: LanguageContextValue = {
    language,
    setLanguage,
    ui: () => translations[language()].ui,
    repair: (repairId) => translations[language()].repairs[repairId],
  };

  return <LanguageContext.Provider value={value}>{props.children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}
