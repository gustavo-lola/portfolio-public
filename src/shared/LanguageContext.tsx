import { useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { Language } from "@/shared/i18n";

import { LanguageContext } from "./LanguageContextBase";

export function LanguageProvider({ children }: Readonly<{ children: ReactNode }>) {
    const [language, setLanguage] = useState<Language>("en");
    const value = useMemo(() => ({ language, setLanguage }), [language]);
    return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
