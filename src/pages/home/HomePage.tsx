import Navbar from "@/pages/home/components/Navbar";
import ExperienceSection from "@/pages/home/sections/ExperienceSection";
import HeroSection from "@/pages/home/sections/HeroSection";
import LibrarySection from "@/pages/home/sections/LibrarySection";
import ProjectsSection from "@/pages/home/sections/ProjectsSection";
import FadeLanguage from "@/shared/components/FadeLanguage";
import LanguageSwitcher from "@/shared/components/LanguageSwitcher";
import { useTranslation } from "@/shared/useTranslation";

import Footer from "./components/Footer";
import Contact from "./sections/ContactSection";
import EducationLanguage from "./sections/EducationLanguagesSection";
import Expertise from "./sections/ExpertiseSection";

export default function HomePage() {
    const { language } = useTranslation();
    return (
        <div className="relative z-0">
            <LanguageSwitcher />
            <FadeLanguage language={language}>
                <main className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 py-3 md:px-8 md:py-4">
                    <Navbar />
                    <div className="flex flex-col pt-6 md:pt-8">
                        <div className="px-4 md:px-12 lg:px-30">
                            <HeroSection />
                        </div>
                        <div className="mt-16 md:mt-40 px-4 md:px-12 lg:px-24">
                            <ExperienceSection />
                        </div>
                        <div className="mt-12 md:mt-32">
                            <ProjectsSection />
                        </div>
                        <div className="mt-12 md:mt-32 px-4 md:px-12 lg:px-24">
                            <LibrarySection />
                        </div>
                        <div className="mt-12 md:mt-32 px-4 md:px-12 lg:px-24">
                            <Expertise />
                        </div>
                        <div className="mt-12 md:mt-32 px-4 md:px-12 lg:px-24">
                            <EducationLanguage />
                        </div>
                        <div className="mt-12 md:mt-32 px-4 md:px-12 lg:px-24">
                            <Contact />
                        </div>
                        <Footer />
                    </div>
                </main>
            </FadeLanguage>
        </div>
    );
}
