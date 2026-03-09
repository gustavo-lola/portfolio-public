import ExperienceItem from "@/shared/components/ExperienceItem";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { useTranslation } from "@/shared/useTranslation";
import { motion } from "motion/react";
import type { Variants } from "motion/react";

const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
            duration: 0.55,
            ease: "easeOut" as const,
            staggerChildren: 0.12,
        },
    },
};

const headerVariants: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
};

const timelineVariants: Variants = {
    hidden: { scaleY: 0, opacity: 0 },
    show: {
        scaleY: 1,
        opacity: 1,
        transition: { duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] as const },
    },
};

export default function ExperienceSection() {
    const { language } = useTranslation();
    // Dynamic experiences array for translation
    const experiences = [
        {
            company: "Espaço 4.0 IFAL",
            role: language === "pt" ? "Desenvolvedor de Software" : "Software Developer",
            period: language === "pt" ? "Out 2025 - Presente" : "Oct 2025 - Present",
            description:
                language === "pt"
                    ? [
                          "Liderando a evolução do sistema, garantindo qualidade, performance e escalabilidade.",
                          "Participação ativa em decisões de arquitetura de APIs.",
                          "Liderando a equipe de desenvolvimento e promovendo boas práticas.",
                      ]
                    : [
                          "Leading system evolution, ensuring quality, performance, and scalability.",
                          "Active participation in API architecture decisions.",
                          "Leading the dev team and promoting best practices.",
                      ],
        },
        {
            company: "PrimeCode Solutions",
            role: language === "pt" ? "Desenvolvedor de Software (Freelancer)" : "Software Developer (Freelancer)",
            period: language === "pt" ? "Jul 2025 - Dez 2025" : "July 2025 - Dec 2025",
            description:
                language === "pt"
                    ? [
                          "Desenvolveu APIs RESTful de alta performance com tratamento de erros padronizado.",
                          "Construiu aplicações responsivas usando boas práticas de front-end.",
                          "Implementou arquiteturas escaláveis com separação em camadas e modularização.",
                      ]
                    : [
                          "Developed high-performance RESTful APIs with standardized error handling.",
                          "Built responsive applications using front-end best practices.",
                          "Implemented scalable architectures using layered separation and modularization.",
                      ],
        },
        {
            company: "DPI",
            role: language === "pt" ? "Desenvolvedor de Software (Freelancer)" : "Software Developer (Freelancer)",
            period: language === "pt" ? "Jun 2025 - Nov 2025" : "June 2025 - Nov 2025",
            description:
                language === "pt"
                    ? [
                          "Implementou webhooks para comunicação assíncrona e integrações externas.",
                          "Desenvolveu APIs RESTful com autenticação e respostas padronizadas.",
                          "Modelou e estruturou bancos de dados com otimização de consultas.",
                      ]
                    : [
                          "Implemented webhooks for asynchronous communication and external integrations.",
                          "Developed RESTful APIs with authentication and standardized responses.",
                          "Modeled and structured databases with query optimization.",
                      ],
        },
    ];
    return (
        <motion.section
            id="experience"
            className="relative space-y-16 scroll-mt-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            variants={sectionVariants}
            key={language}
        >
            <SectionHeader title="Experience" number="01" />
            <motion.div variants={headerVariants} className="relative space-y-16 pt-8 md:space-y-20 md:pt-10">
                <motion.span
                    variants={timelineVariants}
                    className="absolute top-10 bottom-12 left-52 hidden w-px origin-top bg-linear-to-b from-black/25 via-black/18 to-black/8 md:block"
                />
                {experiences.map((experience) => (
                    <ExperienceItem
                        key={`${experience.company}-${experience.period}`}
                        company={experience.company}
                        role={experience.role}
                        period={experience.period}
                        description={[...experience.description]}
                    />
                ))}
            </motion.div>
        </motion.section>
    );
}
