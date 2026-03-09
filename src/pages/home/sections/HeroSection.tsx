import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { SendIcon } from "@/shared/icons/send";
import type { SendIconHandle } from "@/shared/icons/send";
import { useTranslation } from "@/shared/useTranslation";
import {
    FeatherIcon as AnimatedFeatherIcon,
    GithubIcon as AnimatedGithubIcon,
    LinkedinIcon as AnimatedLinkedinIcon,
} from "lucide-animated";
import { ArrowRight, Code2, FolderGit2, MapPin, Terminal } from "lucide-react";
import { motion } from "motion/react";

const arrowMotion = {
    rest: { x: 0, y: 0 },
    hover: { x: 4, y: -1 },
};

function Badge({ icon, label }: Readonly<{ icon: ReactNode; label: string }>) {
    return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-gray-200 bg-white text-[10px] font-medium text-gray-500 uppercase tracking-[0.12em]">
            {icon}
            {label}
        </span>
    );
}

function SocialIcon({ href, icon }: Readonly<{ href: string; icon: ReactNode }>) {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 transition-colors hover:text-black"
            aria-label="Social link"
            whileHover={{ y: -3, scale: 1.08 }}
            whileTap={{ scale: 0.96 }}
            transition={{ type: "spring", stiffness: 300, damping: 18 }}
        >
            {icon}
        </motion.a>
    );
}

function StatCard({ icon, value, label }: Readonly<{ icon: ReactNode; value: string; label: string }>) {
    const { t } = useTranslation();
    return (
        <motion.div
            className="w-30  rounded-[1.25rem] border border-gray-200 bg-white/95 px-4 py-3 shadow-[0_12px_24px_rgba(15,15,15,0.08)] backdrop-blur-sm"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -7, scale: 1.04, rotate: -2, boxShadow: "0 18px 38px rgba(15,15,15,0.14)" }}
            transition={{ type: "spring", stiffness: 240, damping: 18, delay: 0.15 }}
        >
            <div className="mb-4 text-gray-500">{icon}</div>
            <p className="text-2xl font-bold tracking-tight text-black">{value}</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-gray-400">
                {t(label as keyof typeof import("@/shared/i18n").translations.en)}
            </p>
        </motion.div>
    );
}

export default function HeroSection() {
    const sendIconRef = useRef<SendIconHandle>(null);
    const { t, language } = useTranslation();
    const [prevLang, setPrevLang] = useState(language);
    const [fade, setFade] = useState(true);

    useEffect(() => {
        if (language !== prevLang) {
            setTimeout(() => {
                setFade(false);
                setPrevLang(language);
                setFade(true);
            }, 350);
        }
    }, [language, prevLang]);

    return (
        <motion.section
            id="hero"
            className="flex flex-1 items-start pt-1 md:pt-2"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
        >
            <div className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-[minmax(0,1fr)_26rem] lg:gap-12">
                <div className="max-w-116 space-y-5">
                    <div className="flex flex-wrap gap-2">
                        <Badge
                            icon={<MapPin size={12} />}
                            label={language === "pt" ? "Arapiraca-AL, Brasil" : "Arapiraca-AL, Brazil"}
                        />
                        <Badge
                            icon={<Terminal size={12} />}
                            label={language === "pt" ? "Desenvolvedor de Software" : "Software Developer"}
                        />
                    </div>

                    <motion.div
                        key={language}
                        className="space-y-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: fade ? 1 : 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                    >
                        <p className="text-[16px] font-bold uppercase tracking-widest text-gray-600">
                            {language === "pt" ? "Desenvolvedor de Software" : "Software Developer"}
                        </p>
                        <h1 className="text-9xl font-bold tracking-tighter leading-[0.86] md:text-7xl xl:text-[6.5rem]">
                            Gustavo
                            <br />
                            <span>L</span>
                            <span className="relative inline-block">
                                o
                                <motion.span
                                    className="absolute top-[0.01em] left-1/2 text-[0.6em] leading-none"
                                    animate={{ y: [0, -2, 0] }}
                                    transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                                    style={{ x: "-50%" }}
                                >
                                    ´
                                </motion.span>
                            </span>
                            <span>la</span>
                        </h1>
                        <motion.p
                            className="max-w-xl text-2xl leading-relaxed text-gray-500"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: fade ? 1 : 0 }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                        >
                            {language === "pt" ? (
                                <>
                                    Especialista em{" "}
                                    <strong className="text-black font-semibold">APIs escaláveis</strong> e{" "}
                                    <strong className="text-black font-semibold">arquiteturas robustas</strong>.
                                    Transformando ideias em sistemas de alta performance.
                                </>
                            ) : (
                                <>
                                    Specialist in <strong className="text-black font-semibold">scalable APIs</strong>{" "}
                                    and <strong className="text-black font-semibold">robust architectures</strong>.
                                    Turning ideas into high-performance systems.
                                </>
                            )}
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="flex flex-wrap gap-3 pt-1"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.2, ease: "easeOut" }}
                    >
                        <motion.a
                            href="/#projects"
                            className="inline-flex text-xl items-center gap-2 bg-black text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
                            onMouseEnter={() => sendIconRef.current?.startAnimation()}
                            onMouseLeave={() => sendIconRef.current?.stopAnimation()}
                            initial="rest"
                            animate="rest"
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                            variants={{
                                rest: { x: 0, y: 0, boxShadow: "0 0 0 rgba(15,15,15,0)" },
                                hover: { x: 4, y: -3, boxShadow: "0 16px 30px rgba(15,15,15,0.18)" },
                            }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        >
                            <SendIcon ref={sendIconRef} size={18} />
                            {t("viewProjects")}
                            <motion.span
                                variants={arrowMotion}
                                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                            >
                                <ArrowRight size={18} />
                            </motion.span>
                        </motion.a>
                        <motion.a
                            href="/#contact"
                            className="inline-flex items-center text-xl gap-2 border border-gray-200 px-5 py-2.5 rounded-xl hover:bg-gray-50 transition-colors font-bold"
                            initial="rest"
                            animate="rest"
                            whileHover="hover"
                            whileTap={{ scale: 0.98 }}
                            variants={{
                                rest: {
                                    x: 0,
                                    y: 0,
                                    boxShadow: "0 0 0 rgba(15,15,15,0)",
                                    backgroundColor: "rgba(255,255,255,1)",
                                },
                                hover: {
                                    x: 4,
                                    y: -3,
                                    backgroundColor: "rgba(249,250,251,1)",
                                    boxShadow: "0 16px 30px rgba(15,15,15,0.08)",
                                },
                            }}
                            transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        >
                            {t("contact")}
                            <motion.span
                                variants={arrowMotion}
                                transition={{ type: "spring", stiffness: 320, damping: 18 }}
                            >
                                <ArrowRight size={18} />
                            </motion.span>
                        </motion.a>
                    </motion.div>

                    <motion.div
                        className="flex items-center gap-6 pt-4"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.26, ease: "easeOut" }}
                    >
                        <p className="text-xs font-bold text-gray-600 uppercase tracking-widest">{t("connect")}</p>
                        <div className="flex gap-4">
                            <SocialIcon
                                href="https://github.com/gustavo-lola"
                                icon={<AnimatedGithubIcon size={26} />}
                            />
                            <SocialIcon
                                href="https://linkedin.com/in/gustavo-lola"
                                icon={<AnimatedLinkedinIcon size={26} />}
                            />
                            <SocialIcon
                                href="mailto:gustavolola.dev@gmail.com"
                                icon={<AnimatedFeatherIcon size={26} />}
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="relative flex justify-center pt-4 lg:justify-end lg:pt-0"
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.18, ease: "easeOut" }}
                >
                    <div className="group relative h-80 w-72 rounded-3xl md:h-104 md:w-88 xl:h-112 xl:w-96">
                        <div className="h-full w-full overflow-hidden rounded-3xl border border-gray-200 bg-linear-to-br from-gray-200 to-gray-300 shadow-[0_18px_50px_rgba(15,15,15,0.08)]">
                            <img
                                src="/profile.png"
                                alt={language === "pt" ? "Foto de Gustavo Lóla" : "Photo of Gustavo Lóla"}
                                className="h-full w-full object-cover grayscale transition duration-500 ease-out group-hover:grayscale-0"
                            />
                        </div>
                        <div className="absolute -bottom-8 -left-10 z-10 hidden gap-4 md:flex">
                            <StatCard
                                icon={<Code2 size={16} />}
                                value="1+"
                                label={language === "pt" ? "Ano Exp." : "Yrs Exp."}
                            />
                            <StatCard
                                icon={<FolderGit2 size={16} />}
                                value="6+"
                                label={language === "pt" ? "Projetos" : "Projects"}
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </motion.section>
    );
}
