import ProjectCard from "@/shared/components/ProjectCard";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { useTranslation } from "@/shared/useTranslation";
import { motion, type Variants } from "motion/react";

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.08,
        },
    },
};

export default function ProjectsSection() {
    const { language } = useTranslation();
    const projects = [
        {
            title: language === "pt" ? "Encurtador de URL" : "URL Shortener",
            description:
                language === "pt"
                    ? "API robusta para encurtamento de links, com painel de estatísticas, autenticação e deploy escalável em Docker."
                    : "Robust URL shortener API with stats dashboard, authentication, and scalable Docker deployment.",
            tags: ["TypeScript", "SQL", "Docker", "API"],
            link: "https://github.com/gustavo-lola/encurtador",
        },
        {
            title: language === "pt" ? "Automação de Notas de Entrada" : "Invoice Automation",
            description:
                language === "pt"
                    ? "Automação inteligente para processamento e extração de dados de notas fiscais eletrônicas, usando TypeScript e Puppeteer."
                    : "Smart automation for processing and extracting data from electronic invoices, using TypeScript and Puppeteer.",
            tags: ["TypeScript", "Puppeteer", "Automation", "Scraping"],
            link: "https://github.com/gustavo-lola/notas-entrada",
        },
        {
            title: language === "pt" ? "Website da PrimeCode" : "PrimeCode Website",
            description:
                language === "pt"
                    ? "Site institucional moderno e responsivo para a PrimeCode, com animações, formulários e integração backend."
                    : "Modern, responsive institutional website for PrimeCode, with animations, forms, and backend integration.",
            tags: ["React", "TypeScript", "SQL", "Docker", "Frontend"],
            link: "https://primeecode.com.br/",
        },
        {
            title:
                language === "pt"
                    ? "Repositório Público de Ícones (Lucide Animated)"
                    : "Public Icon Repository (Lucide Animated)",
            description:
                language === "pt"
                    ? "Contribuição para biblioteca open source de ícones SVG animados, utilizada neste portfólio e em projetos globais."
                    : "Contributor to open source animated SVG icon library, used in this portfolio and global projects.",
            tags: ["TypeScript", "Open Source", "Icons", "SVG"],
            link: "https://github.com/gustavo-lola/icons",
        },
        {
            title: language === "pt" ? "Automação de Consulta de CPF" : "CPF Lookup Automation",
            description:
                language === "pt"
                    ? "Ferramenta automatizada para consulta de CPF, com interface React e backend TypeScript."
                    : "Automated tool for CPF lookup, with React interface and TypeScript backend.",
            tags: ["TypeScript", "React", "Automation"],
            link: "https://github.com/gustavo-lola/consulta-cpf",
        },
        {
            title: "Dev Quiz",
            description:
                language === "pt"
                    ? "Quiz interativo para desenvolvedores, com perguntas de lógica, HTML, CSS e JavaScript."
                    : "Interactive quiz for developers, with logic, HTML, CSS, and JavaScript questions.",
            tags: ["HTML", "CSS", "JavaScript", "Quiz"],
            link: "https://github.com/gustavo-lola/Dev-Quiz",
        },
        {
            title: language === "pt" ? "Webhook Chatwoot WhatsApp" : "Chatwoot WhatsApp Webhook",
            description:
                language === "pt"
                    ? "Webhook para monitorar status de conexão de usuários no WhatsApp via Chatwoot, com deploy em Docker."
                    : "Webhook to monitor WhatsApp user connection status via Chatwoot, with Docker deployment.",
            tags: ["TypeScript", "Docker", "Webhook", "Chatwoot"],
            link: "https://github.com/gustavo-lola/conectado",
        },
        {
            title: "Pokedex App",
            description:
                language === "pt"
                    ? "Aplicação divertida para explorar e buscar Pokémons, desenvolvida em TypeScript para praticar lógica e consumo de API."
                    : "Fun app to explore and search for Pokémons, built in TypeScript to practice logic and API consumption.",
            tags: ["TypeScript", "API", "Fun"],
            link: "https://github.com/gustavo-lola/pokedex-app",
        },
        {
            title: language === "pt" ? "Sistema Espaço 4.0" : "Space 4.0 System",
            description:
                language === "pt"
                    ? "Sistema avançado para gestão e visualização de dados do Espaço 4.0, utilizando React, TypeScript, Docker, SQL e Three.js para gráficos 3D."
                    : "Advanced system for management and visualization of Space 4.0 data, using React, TypeScript, Docker, SQL, and Three.js for 3D graphics.",
            tags: ["TypeScript", "React", "Docker", "SQL", "Three.js", "3D"],
            link: "#",
        },
        {
            title: language === "pt" ? "Fercen - Controle Energético IFAL" : "Fercen - IFAL Energy Control",
            description:
                language === "pt"
                    ? "Sistema para controle energético do Instituto Federal de Alagoas (IFAL), com integração à pegada de carbono e desenvolvimento contínuo de novas features."
                    : "Energy management system for IFAL (Federal Institute of Alagoas), with carbon footprint integration and continuous feature development.",
            tags: ["TypeScript", "React", "Docker", "CI/CD", "SQL", "Neon"],
            link: "https://fercen.ifal.edu.br/",
        },
    ];

    return (
        <section id="projects" className="space-y-12 sm:space-y-16 scroll-mt-24" key={language}>
            <div className="px-4 sm:px-12 md:px-24">
                <SectionHeader title="Projects" number="02" />
            </div>

            <div className="px-4 sm:px-12 md:px-24">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mx-auto grid max-w-full sm:max-w-4xl md:max-w-6xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2"
                >
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.title}
                            title={project.title}
                            description={project.description}
                            tags={[...project.tags]}
                            link={project.link}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
