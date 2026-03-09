import { useEffect } from "react";
import HomePage from "@/pages/home/HomePage";
import { LanguageProvider } from "@/shared/LanguageContext";
import CursorDot from "@/shared/components/CursorDot";
import { SEO } from "@/shared/components/SEO";
import { Analytics } from "@vercel/analytics/react";
import Lenis from "lenis";
import { HelmetProvider } from "react-helmet-async";

function useSmoothScroll() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const id = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(id);
            lenis.destroy();
        };
    }, []);
}

export default function App() {
    useSmoothScroll();

    return (
        <HelmetProvider>
            <Analytics />
            <LanguageProvider>
                <SEO />
                <CursorDot />
                <HomePage />
            </LanguageProvider>
        </HelmetProvider>
    );
}
