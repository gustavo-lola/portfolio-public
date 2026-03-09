import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" },
    },
};

const headerIconVariants: Variants = {
    headerHover: {
        rotate: [0, -12, 12, -8, 8, -4, 4, 0],
        scale: [1, 1.2, 1.2, 1.15, 1.15, 1.1, 1.1, 1],
        transition: { duration: 0.6, ease: "easeInOut" },
    },
};

export default function SkillCard({
    icon,
    title,
    skills,
}: Readonly<{
    icon: ReactNode;
    title: string;
    skills: { name: string; color: string; icon?: ReactNode }[];
}>) {
    return (
        <motion.div
            variants={cardVariants}
            whileHover={{
                scale: 1.02,
                borderColor: "var(--color-ink)",
                boxShadow: "0 8px 32px 0 rgba(0,0,0,0.10)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="p-8 border border-border rounded-3xl space-y-8 bg-white"
        >
            <motion.div className="flex items-center gap-4" whileHover="headerHover">
                <motion.div variants={headerIconVariants} className="p-2 bg-ink text-paper rounded-xl">
                    {icon}
                </motion.div>
                <h3 className="text-xl font-bold tracking-tight">{title}</h3>
            </motion.div>

            <div className="grid grid-cols-1 gap-4">
                {skills.map((skill) => (
                    <div key={skill.name} className="space-y-2">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-gray-400 inline-flex">{skill.icon}</span>
                                <span className="font-bold text-sm uppercase tracking-widest">{skill.name}</span>
                            </div>
                            <div className="w-2 h-2 rounded-full shadow-sm" style={{ backgroundColor: skill.color }} />
                        </div>
                        <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true }}
                                transition={{ duration: 1.5, ease: "circOut" }}
                                className="h-full rounded-full opacity-40"
                                style={{ backgroundColor: skill.color }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
