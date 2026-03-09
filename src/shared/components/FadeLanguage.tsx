import type { PropsWithChildren } from "react";
import { AnimatePresence, motion } from "motion/react";

export default function FadeLanguage({ language, children }: PropsWithChildren<{ language: string }>) {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={language}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
