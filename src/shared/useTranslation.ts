import { translations } from "@/shared/i18n";
import { useLanguage } from "@/shared/useLanguage";

export function useTranslation() {
    const { language } = useLanguage();
    function t(key: keyof (typeof translations)["en"]) {
        return translations[language][key] || key;
    }
    return { t, language };
}
