import { ExternalLink, Globe } from "lucide-react";
import { motion } from "motion/react";

const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4, ease: "easeOut" as const },
    },
};

export default function ProjectCard({
    title,
    description,
    tags,
    link,
}: Readonly<{
    title: string;
    description: string;
    tags: string[];
    link: string;
}>) {
    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -8 }}
            className="p-6 border border-border rounded-[1.6rem] space-y-5 hover:border-ink transition-all duration-500 group"
        >
            <div className="flex justify-between items-start">
                <div className="p-2.5 bg-zinc-100 rounded-xl group-hover:bg-ink group-hover:text-paper transition-colors">
                    <Globe size={22} />
                </div>
                <a href={link} className="p-2 hover:bg-zinc-100 rounded-full transition-colors">
                    <ExternalLink size={18} />
                </a>
            </div>
            <div className="space-y-2">
                <h3 className="text-[1.35rem] font-bold tracking-tight">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="rounded-full bg-zinc-100 px-2.5 py-1 text-[11px] font-bold uppercase tracking-widest"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </motion.div>
    );
}
