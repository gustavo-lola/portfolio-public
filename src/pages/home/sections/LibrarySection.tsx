import BookCard from "@/shared/components/BookCard";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { useTranslation } from "@/shared/useTranslation";
import { motion } from "motion/react";

export default function LibrarySection() {
    const { t, language } = useTranslation();
    const books = [
        {
            title: language === "pt" ? "Padrões de Projeto" : "Design Patterns",
            author: language === "pt" ? "Gangue dos Quatro" : "Gang of Four",
            status: "reading",
            progress: 30,
            cover: "/books/design_patterns.jpg",
            href: "https://www.amazon.com.br/Design-Patterns-Object-Oriented-Addison-Wesley-Professional-ebook/dp/B000SEIBB8",
        },
        {
            title: language === "pt" ? "O Programador Pragmático" : "The Pragmatic Programmer",
            author: "Andrew Hunt & David Thomas",
            status: "reading",
            progress: 40,
            cover: "/books/programador_pragmatico.jpg",
            href: "https://www.amazon.com.br/Pragmatic-Programmer-Journeyman-Master-1st/dp/8131722422",
        },
        {
            title: "Clean Architecture",
            author: "Robert C. Martin",
            status: "reading",
            progress: 50,
            cover: "/books/clean_archteture.jpg",
            href: "https://www.amazon.com.br/Clean-Architecture-Craftsmans-Software-Structure-ebook/dp/B075LRM681",
        },
        {
            title: "Entendendo Algoritmos",
            author: "Aditya Y. Bhargava",
            status: "completed",
            progress: 100,
            cover: "/books/entendendo_algoritimos.jpg",
            href: "https://www.amazon.com.br/Entendendo-Algoritmos-Ilustrado-Programadores-Curiosos/dp/8575225634",
        },
        {
            title: "Código Limpo",
            author: "Robert C. Martin",
            status: "completed",
            progress: 100,
            cover: "/books/codigo_limpo.jpg",
            href: "https://www.amazon.com.br/C%C3%B3digo-limpo-Robert-C-Martin/dp/8576082675",
        },
        {
            title: "Domain-Driven Design",
            author: "Eric Evans",
            status: "reading",
            progress: 30,
            cover: "/books/domain_drive_desing.webp",
            href: "https://www.amazon.com.br/Domain-Driven-Design-Atacando-Complexidades-Software/dp/8550800651",
        },
    ];
    return (
        <motion.section
            id="library"
            className="space-y-12 sm:space-y-16 scroll-mt-24"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.18 }}
            key={language}
        >
            <div className="space-y-4">
                <SectionHeader title="library" number="03" />
                <p className="text-gray-600 max-w-xl text-lg italic">{t("libraryDescription")}</p>
            </div>
            <motion.div className="grid grid-cols-1 gap-6 sm:gap-12 md:grid-cols-3">
                {books.map((book, i) => (
                    <BookCard
                        key={`${book.title}-${i}`}
                        title={book.title}
                        author={book.author}
                        status={book.status}
                        progress={book.progress}
                        cover={book.cover}
                        href={book.href}
                    />
                ))}
            </motion.div>
        </motion.section>
    );
}
