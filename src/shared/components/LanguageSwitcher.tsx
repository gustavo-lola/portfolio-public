import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/shared/useLanguage";
import { motion } from "framer-motion";
import { Check, Languages } from "lucide-react";

const LANGS = [
    { code: "en", label: "English" },
    { code: "pt", label: "Português" },
];

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    return (
        <div ref={ref} className="fixed top-4 right-4 z-50 flex items-center gap-2 select-none">
            <button
                className="p-2 bg-white transition-all duration-200 hover:scale-110 hover:text-blue-600 focus:outline-none  focus:ring-blue-300"
                aria-label="Change language"
                tabIndex={0}
                onClick={() => setOpen((v) => !v)}
            >
                <Languages size={22} />
            </button>
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, ease: [0.4, 0, 0.2, 1] }}
                    className="absolute top-[110%] right-0 min-w-35 rounded-xl bg-white/95 border border-gray-200 shadow-2xl ring-1 ring-black/5 overflow-hidden p-2 flex flex-col gap-1"
                >
                    {LANGS.map((lang) => (
                        <button
                            key={lang.code}
                            className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-800 rounded-lg hover:bg-gray-100 transition-colors ${language === lang.code ? "font-bold bg-gray-50" : ""}`}
                            onClick={() => {
                                setLanguage(lang.code as typeof language);
                                setOpen(false);
                            }}
                        >
                            {language === lang.code && <Check size={16} className="text-green-600" />}
                            <span className="ml-1">{lang.label}</span>
                        </button>
                    ))}
                </motion.div>
            )}
        </div>
    );
}
