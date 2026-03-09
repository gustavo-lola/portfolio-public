import { SectionHeader } from "@/shared/components/SectionHeader";
import { Globe, Languages, MessageSquare } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "@/shared/useTranslation";

export default function EducationLanguage() {
    const { language } = useTranslation();
    const languagesArr = [
        {
            name: language === "pt" ? "Espanhol" : "Spanish",
            level: language === "pt" ? "C1 Avançado" : "C1 Advanced",
            color: "#eab308",
            icon: <Globe size={20} />,
        },
        {
            name: language === "pt" ? "Inglês" : "English",
            level: language === "pt" ? "B2 Intermediário" : "B2 Intermediate",
            color: "#3b82f6",
            icon: <Languages size={20} />,
        },
        {
            name: language === "pt" ? "Português" : "Portuguese",
            level: language === "pt" ? "Nativo" : "Native",
            color: "#22c55e",
            icon: <MessageSquare size={20} />,
        },
    ];
    return (
        <section id="education" className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-12" key={language}>
            <div className="space-y-10">
                <SectionHeader title="Education" number="05" />
                <div className="flex flex-col gap-2 border-l-2 border-ink pl-6">
                    <h3 className="text-2xl font-bold">{language === "pt" ? "Sistemas de Informação" : "Information Systems"}</h3>
                    <p className="text-gray-500 text-lg">Instituto Federal de Alagoas</p>
                    <p className="text-sm font-mono bg-zinc-100 inline-block px-2 py-1 rounded mt-1">
                        {language === "pt" ? "Previsão Março 2029" : "Expected March 2029"}
                    </p>
                </div>
            </div>

            <div className="space-y-10">
                <SectionHeader title="Languages" number="06" />
                <div className="flex flex-col gap-4">
                    {languagesArr.map((lang, i) => (
                        <motion.div
                            key={lang.name}
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: i * 0.12, ease: "easeOut" }}
                            whileHover="cardHover"
                            className="flex items-center justify-between px-6 py-4 border border-border rounded-2xl bg-white cursor-default transition-[border-color,box-shadow] duration-200 hover:border-ink hover:shadow-[0_8px_32px_0_rgba(0,0,0,0.10)]"
                        >
                            <div className="flex items-center gap-4">
                                <motion.span
                                    variants={{
                                        cardHover: {
                                            rotate: [0, -12, 12, -6, 6, 0],
                                            transition: { duration: 0.5, ease: "easeInOut" },
                                        },
                                    }}
                                    className="text-gray-900 inline-flex"
                                >
                                    {lang.icon}
                                </motion.span>
                                <motion.div
                                    variants={{
                                        cardHover: {
                                            scale: [1, 1.5, 1, 1.3, 1],
                                            transition: { duration: 0.45, ease: "easeInOut" },
                                        },
                                    }}
                                    className="w-3 h-3 rounded-full"
                                    style={{ backgroundColor: lang.color }}
                                />
                                <span className="font-bold text-lg">{lang.name}</span>
                            </div>
                            <span className="text-sm font-mono font-semibold" style={{ color: lang.color }}>
                                {lang.level}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
