import { useTranslation } from "@/shared/useTranslation";
import { motion } from "motion/react";

const statusStyles: Record<string, string> = {
    reading: "bg-blue-50 text-blue-600",
    completed: "bg-green-50 text-green-600",
    toRead: "bg-zinc-100 text-zinc-500",
};

export default function BookCard({
    title,
    author,
    status,
    progress,
    cover,
    href,
}: Readonly<{
    title: string;
    author: string;
    status: string;
    progress: number;
    cover: string;
    href: string;
}>) {
    const { t } = useTranslation();
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -8 }}
            className="group block rounded-[1.6rem] border border-border p-6 space-y-5 transition-all duration-500 hover:border-ink cursor-pointer"
        >
            <div className="overflow-hidden rounded-xl aspect-2/3 w-full bg-zinc-100">
                <img
                    src={cover}
                    alt={`Capa do livro ${title} por ${author}`}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
            </div>
            <div className="space-y-2">
                <h3 className="text-[1.1rem] font-bold tracking-tight leading-snug">{title}</h3>
                <p className="text-sm text-gray-500">{author}</p>
            </div>
            <div className="space-y-2">
                <div className="flex items-center justify-between">
                    <span
                        className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest ${statusStyles[status] ?? statusStyles.reading}`}
                    >
                        {t(status as keyof (typeof import("@/shared/i18n").translations)["en"])}
                    </span>
                    <span className="text-xs font-semibold text-gray-400">{progress}%</span>
                </div>
                <div className="h-1 w-full overflow-hidden rounded-full bg-zinc-100">
                    <motion.div
                        className="h-full rounded-full bg-ink"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                </div>
            </div>
        </motion.a>
    );
}
