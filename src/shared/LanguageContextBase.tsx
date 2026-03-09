import { createContext } from "react";
import type { Language } from "@/shared/i18n";

export interface LanguageContextProps {
    language: Language;
    setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);
