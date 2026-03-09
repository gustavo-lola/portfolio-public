import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import type { Variants } from "motion/react";

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.55,
            ease: "easeOut" as const,
            staggerChildren: 0.08,
        },
    },
};

const contentVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

function TypingTitle({ text }: Readonly<{ text: string }>) {
    const titleRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(titleRef, { once: true, amount: 0.7 });
    const [visibleLength, setVisibleLength] = useState(0);

    useEffect(() => {
        if (!isInView) {
            return;
        }

        let frameId = 0;
        const totalLength = text.length;
        const duration = Math.min(900, Math.max(420, totalLength * 55));
        const startTime = performance.now();

        const animate = (currentTime: number) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const nextLength = Math.max(1, Math.round(totalLength * progress));

            setVisibleLength(nextLength);

            if (progress < 1) {
                frameId = globalThis.requestAnimationFrame(animate);
            }
        };

        frameId = globalThis.requestAnimationFrame(animate);

        return () => globalThis.cancelAnimationFrame(frameId);
    }, [isInView, text]);

    return (
        <span ref={titleRef} className="relative inline-flex items-center">
            <span className="invisible">{text}</span>
            <span className="absolute inset-0 inline-flex items-center overflow-hidden whitespace-nowrap">
                <span>{text.slice(0, visibleLength)}</span>
                {visibleLength > 0 && visibleLength < text.length && (
                    <motion.span
                        aria-hidden="true"
                        className="ml-[0.06em] h-[0.82em] w-[0.08em] shrink-0 bg-black/75"
                        animate={{ opacity: [1, 0.15, 1] }}
                        transition={{ duration: 0.7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" as const }}
                    />
                )}
            </span>
        </span>
    );
}

export default function ExperienceItem({
    company,
    role,
    period,
    description,
}: Readonly<{
    company: string;
    role: string;
    period: string;
    description: string[];
}>) {
    return (
        <motion.article
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={itemVariants}
            className="group relative flex flex-col gap-6 md:grid md:grid-cols-[10rem_2rem_minmax(0,1fr)] md:gap-x-8"
        >
            <motion.div variants={contentVariants} className="shrink-0 md:pt-1">
                <p className="text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-gray-600 transition-colors duration-500 group-hover:text-black">
                    {period}
                </p>
            </motion.div>

            <div className="relative hidden items-start justify-center md:flex">
                <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: [0, 1.12, 1], opacity: 1 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.45, delay: 0.12, ease: "easeOut" as const }}
                    className="relative z-10 mt-1.5 h-4 w-4 rounded-full border-[5px] border-white bg-black shadow-[0_0_0_1px_rgba(15,15,15,0.12)] transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            <motion.div variants={contentVariants} className="min-w-0 flex-1 space-y-6 pb-8 md:pb-12">
                <div className="space-y-3">
                    <h3 className="text-4xl font-bold tracking-tighter md:text-[3.2rem] md:leading-none">
                        <span className="relative inline-flex items-center after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-black/45 after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100">
                            <TypingTitle text={company} />
                        </span>
                    </h3>
                    <h4 className="flex items-center gap-2 text-xl font-medium tracking-tight text-gray-500/85">
                        {role}
                    </h4>
                </div>

                <ul className="max-w-3xl space-y-5 text-lg leading-relaxed text-gray-500">
                    {description.map((item, index) => (
                        <motion.li
                            key={`${company}-${item}`}
                            variants={contentVariants}
                            initial={{ opacity: 0, x: -14 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, amount: 0.7 }}
                            transition={{ duration: 0.35, delay: 0.18 + index * 0.08, ease: "easeOut" as const }}
                            className="flex gap-5"
                        >
                            <span className="mt-3.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                            {item}
                        </motion.li>
                    ))}
                </ul>
            </motion.div>
        </motion.article>
    );
}
