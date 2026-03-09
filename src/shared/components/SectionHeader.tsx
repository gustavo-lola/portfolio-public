import { useTranslation } from "@/shared/useTranslation";
import { motion, type Variants } from "motion/react";

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

export function SectionHeader({ title, number }: Readonly<{ title: string; number: string }>) {
    const { t } = useTranslation();

    const maxSections = 7;
    const sectionNum = Number.parseInt(number, 10);
    const style: React.CSSProperties = {};
    style.width = `${(Math.max(1, Math.min(sectionNum, maxSections)) / maxSections) * 100}%`;
    return (
        <motion.div
            variants={headerVariants}
            className="relative flex items-end justify-between border-b border-ink/10 pb-4"
        >
            <motion.div
                className="absolute bottom-0 left-0 h-0.5 bg-ink"
                style={style}
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" as const }}
            />
            <h2 className="text-4xl font-bold tracking-tighter uppercase italic">
                {t(title as keyof typeof import("@/shared/i18n").translations.en)}
            </h2>
            <span className="text-sm font-mono text-gray-600">{number} / 07</span>
        </motion.div>
    );
}
