import { useContext } from "react";

import { LanguageContext } from "./LanguageContextBase";
import type { LanguageContextProps } from "./LanguageContextBase";

export function useLanguage(): LanguageContextProps {
    const ctx = useContext(LanguageContext);
    if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
    return ctx;
}
