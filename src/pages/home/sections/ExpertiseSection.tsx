import { SectionHeader } from "@/shared/components/SectionHeader";
import SkillCard from "@/shared/components/SkillCard";
import { useTranslation } from "@/shared/useTranslation";
import {
    Box,
    Code2,
    Container,
    Cpu,
    Database,
    FileJson,
    GitBranch,
    Globe,
    Layers,
    Settings,
    Terminal,
    Wrench,
    Zap,
} from "lucide-react";

export default function Expertise() {
    const { language } = useTranslation();
    return (
        <section id="expertise" className="space-y-16 scroll-mt-24" key={language}>
            <SectionHeader title="Expertise" number="04" />
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
                <SkillCard
                    icon={<Code2 size={24} />}
                    title={language === "pt" ? "Linguagens" : "Languages"}
                    skills={[
                        { name: "TypeScript", color: "var(--color-ts)", icon: <FileJson size={14} /> },
                        { name: "Go", color: "var(--color-go)", icon: <Zap size={14} /> },
                        { name: "Python", color: "var(--color-py)", icon: <Terminal size={14} /> },
                        { name: "JavaScript", color: "#f7df1e", icon: <Code2 size={14} /> },
                    ]}
                />
                <SkillCard
                    icon={<Layers size={24} />}
                    title="Frameworks"
                    skills={[
                        { name: "Node.js", color: "var(--color-node)", icon: <Box size={14} /> },
                        { name: "Next.js", color: "#000000", icon: <Globe size={14} /> },
                        { name: "React", color: "var(--color-react)", icon: <Cpu size={14} /> },
                        { name: "Express", color: "#828282", icon: <Settings size={14} /> },
                    ]}
                />
                <SkillCard
                    icon={<Database size={24} />}
                    title={language === "pt" ? "Bancos de Dados" : "Databases"}
                    skills={[
                        { name: "PostgreSQL", color: "#336791", icon: <Database size={14} /> },
                        { name: "Redis", color: "#d82c20", icon: <Zap size={14} /> },
                        { name: "MongoDB", color: "#47a248", icon: <Layers size={14} /> },
                    ]}
                />
                <SkillCard
                    icon={<Cpu size={24} />}
                    title={language === "pt" ? "Ferramentas" : "Tools"}
                    skills={[
                        { name: "Docker", color: "#2496ed", icon: <Container size={14} /> },
                        { name: "Git", color: "#f05032", icon: <GitBranch size={14} /> },
                        { name: "Webhooks", color: "#5a5a5a", icon: <Wrench size={14} /> },
                    ]}
                />
            </div>
        </section>
    );
}
