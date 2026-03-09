import { useEffect, useMemo, useRef, useState } from "react";
import { AtomIcon } from "@/shared/icons/atom";
import { BookTextIcon } from "@/shared/icons/book-text";
import { CalendarDaysIcon } from "@/shared/icons/calendar-days";
import { FolderGit2Icon } from "@/shared/icons/folder-git-2";
import { HistoryIcon } from "@/shared/icons/history";
import { HomeIcon } from "@/shared/icons/home";
import { MailboxIcon } from "@/shared/icons/mailbox";
import { useTranslation } from "@/shared/useTranslation";
import { motion } from "motion/react";

type AnimatedIconHandle = {
    startAnimation: () => void;
    stopAnimation: () => void;
};

type NavOption = {
    id: number;
    label: string;
    link: string;
    hash: string;
    icon: React.ForwardRefExoticComponent<
        React.HTMLAttributes<HTMLDivElement> & { size?: number } & React.RefAttributes<AnimatedIconHandle>
    >;
};

function normalizeHash(hash: string) {
    const value = hash.replace("#", "").trim().toLowerCase();
    return value || "hero";
}

function NavItem({
    label,
    link,
    hash,
    icon: Icon,
    activeHash,
}: Readonly<Omit<NavOption, "id"> & { activeHash: string }>) {
    const ref = useRef<AnimatedIconHandle>(null);
    const isActive = activeHash === hash.toLowerCase();

    function handleClick(e: React.MouseEvent) {
        e.preventDefault();
        const section = document.getElementById(hash);
        if (section) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });

            globalThis.history.replaceState(null, "", `#${hash}`);
        }
    }

    return (
        <a
            href={link}
            title={label}
            className={`relative flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                isActive ? "text-white" : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={handleClick}
            onMouseEnter={() => ref.current?.startAnimation()}
            onMouseLeave={() => ref.current?.stopAnimation()}
        >
            {isActive && (
                <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 bg-black rounded-xl"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
            )}
            <span className="relative z-10">
                <Icon ref={ref} size={20} />
            </span>
        </a>
    );
}

export default function Navbar() {
    const { t } = useTranslation();
    const [activeHash, setActiveHash] = useState(() => normalizeHash(globalThis.location.hash));
    const activeHashRef = useRef(activeHash);

    const navOptions: NavOption[] = useMemo(
        () => [
            { id: 1, label: t("home"), icon: HomeIcon, link: "/", hash: "hero" },
            { id: 2, label: t("experience"), icon: HistoryIcon, link: "/#experience", hash: "experience" },
            { id: 3, label: t("projects"), icon: FolderGit2Icon, link: "/#projects", hash: "projects" },
            { id: 4, label: t("library"), icon: BookTextIcon, link: "/#library", hash: "library" },
            { id: 5, label: t("expertise"), icon: AtomIcon, link: "/#expertise", hash: "expertise" },
            { id: 6, label: t("education"), icon: CalendarDaysIcon, link: "/#education", hash: "education" },
            { id: 7, label: t("contact"), icon: MailboxIcon, link: "/#contact", hash: "contact" },
        ],
        [t]
    );

    useEffect(() => {
        activeHashRef.current = activeHash;
    }, [activeHash]);

    useEffect(() => {
        const onHashChange = () => setActiveHash(normalizeHash(globalThis.location.hash));
        globalThis.addEventListener("hashchange", onHashChange);
        return () => globalThis.removeEventListener("hashchange", onHashChange);
    }, []);

    useEffect(() => {
        const sections = navOptions
            .map(({ hash }) => document.getElementById(hash))
            .filter((section): section is HTMLElement => section instanceof HTMLElement);

        if (sections.length === 0) {
            return;
        }

        let frameId = 0;

        const syncActiveSection = () => {
            const activationLine = globalThis.innerHeight * 0.32;

            const currentSection = sections.reduce<HTMLElement>((closestSection, section) => {
                if (section.getBoundingClientRect().top - activationLine <= 0) {
                    return section;
                }
                return closestSection;
            }, sections[0]);

            const nextActiveHash = currentSection.id;
            if (nextActiveHash === activeHashRef.current) {
                return;
            }

            setActiveHash(nextActiveHash);
            globalThis.history.replaceState(
                null,
                "",
                `${globalThis.location.pathname}${globalThis.location.search}#${nextActiveHash}`
            );
        };

        const onScroll = () => {
            if (frameId !== 0) {
                return;
            }
            frameId = globalThis.requestAnimationFrame(() => {
                syncActiveSection();
                frameId = 0;
            });
        };

        syncActiveSection();
        globalThis.addEventListener("scroll", onScroll, { passive: true });
        globalThis.addEventListener("resize", onScroll);

        return () => {
            globalThis.removeEventListener("scroll", onScroll);
            globalThis.removeEventListener("resize", onScroll);
            if (frameId !== 0) {
                globalThis.cancelAnimationFrame(frameId);
            }
        };
    }, [navOptions]);

    return (
        <motion.section
            className="sticky top-4 z-50 mb-10 flex items-center justify-between gap-4 py-4 md:mb-14"
            initial={{ opacity: 0, y: -18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
        >
            <motion.div
                className="flex h-15 w-15 items-center justify-center font-bold text-white cursor-pointer"
                whileHover={{ y: -2, scale: 1.03, rotate: -8 }}
                whileTap={{ scale: 0.92, rotate: -10 }}
                transition={{ type: "spring", stiffness: 280, damping: 18 }}
            >
                <img src="/favicon/GL.svg" alt="Logo" loading="eager" className="h-15 w-15 object-contain" />
            </motion.div>

            <motion.div
                className="flex items-center gap-1 rounded-2xl border border-gray-200/80 bg-white/85 p-1.5 shadow-[0_14px_34px_rgba(15,15,15,0.08)] backdrop-blur-xl supports-backdrop-filter:bg-white/75"
                initial={{ opacity: 0, x: 22 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
            >
                {navOptions.map(({ id, ...rest }) => (
                    <NavItem key={id} {...rest} activeHash={activeHash} />
                ))}
            </motion.div>
        </motion.section>
    );
}
