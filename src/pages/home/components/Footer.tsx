export default function Footer() {
    return (
        <footer className="mt-24 border-t border-border px-4 sm:px-12 md:px-24 py-6 sm:py-8 md:py-10 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-sm text-gray-600 font-mono">
            <p>© {new Date().getFullYear()} Gustavo Soares</p>
            <div className="flex gap-6">
                <a href="https://github.com/gustavo-lola" className="hover:text-ink transition-colors">
                    GitHub
                </a>
                <a href="https://linkedin.com/in/gustavo-lola" className="hover:text-ink transition-colors">
                    LinkedIn
                </a>
            </div>
        </footer>
    );
}
