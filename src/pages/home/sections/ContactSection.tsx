import { useRef, useState } from "react";
import { SectionHeader } from "@/shared/components/SectionHeader";
import { SendIcon, type SendIconHandle } from "@/shared/icons/send";
import { useTranslation } from "@/shared/useTranslation";
import emailjs from "@emailjs/browser";
import { FeatherIcon, MapPinIcon, SmartphoneNfcIcon } from "lucide-animated";
import { motion } from "motion/react";

type ContactInfoProps = {
    icon: React.ReactNode;
    label: string;
    value: string;
};

function ContactInfo({ icon, label, value }: Readonly<ContactInfoProps>) {
    let content: React.ReactNode = value;
    if (label.toLowerCase().includes("email")) {
        content = (
            <a
                href={`mailto:${value}`}
                className="text-black no-underline hover:text-blue-600 hover:underline cursor-pointer transition-colors"
            >
                {value}
            </a>
        );
    } else if (label.toLowerCase().includes("phone") || label.toLowerCase().includes("telefone")) {
        const phoneNumber = value.replaceAll(/\D/g, "");
        content = (
            <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-black no-underline hover:text-green-600 hover:underline cursor-pointer transition-colors"
            >
                {value}
            </a>
        );
    }
    return (
        <div className="flex items-center gap-4 group">
            <div className="p-3 bg-zinc-100 rounded-2xl text-ink shrink-0">{icon}</div>
            <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-600">{label}</p>
                <p className="font-medium">{content}</p>
            </div>
        </div>
    );
}

export default function Contact() {
    const { t } = useTranslation();
    const formRef = useRef<HTMLFormElement>(null);
    const sendIconRef = useRef<SendIconHandle>(null);
    const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

    console.log("VITE_EMAILJS_SERVICE_ID:", import.meta.env.VITE_EMAILJS_SERVICE_ID);
    console.log("VITE_EMAILJS_TEMPLATE_ID:", import.meta.env.VITE_EMAILJS_TEMPLATE_ID);
    console.log("VITE_EMAILJS_PUBLIC_KEY:", import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

    async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!formRef.current) return;
        const formData = new FormData(formRef.current);
        const emailRaw = formData.get("from_email");
        const email = typeof emailRaw === "string" ? emailRaw : "";
        if (!email.includes("@")) {
            setFormStatus("error");
            alert("Por favor, informe um e-mail válido contendo '@' para enviar a mensagem.");
            return;
        }
        setFormStatus("sending");
        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID,
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                formRef.current,
                { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY }
            );
            setFormStatus("sent");
            formRef.current.reset();
        } catch {
            setFormStatus("error");
            setTimeout(() => setFormStatus("idle"), 3000);
        }
    }

    return (
        <section id="contact" className="scroll-mt-24">
            <SectionHeader title="contact" number="07" />
            <div className="mt-8 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-16">
                <div className="space-y-8">
                    <h2 className="text-5xl font-bold tracking-tighter">
                        {t("contactMe") === "Contact" ? "Let's build something " : "Vamos construir algo "}
                        <br />
                        {t("contactMe") === "Contact" ? "great together." : "incrível juntos."}
                    </h2>
                    <p className="text-gray-600 text-xl max-w-md leading-relaxed">
                        {t("contactMe") === "Contact"
                            ? "Currently open to new opportunities and interesting projects. Feel free to reach out!"
                            : "Aberto a novas oportunidades e projetos interessantes. Sinta-se à vontade para entrar em contato!"}
                    </p>
                    <div className="space-y-4">
                        <ContactInfo
                            icon={<FeatherIcon size={20} />}
                            label={t("email")}
                            value="gustavolola.dev@gmail.com"
                        />
                        <ContactInfo
                            icon={<SmartphoneNfcIcon size={20} />}
                            label={t("phone")}
                            value="+55 (82) 99653-5022"
                        />
                        <ContactInfo icon={<MapPinIcon size={20} />} label={t("location")} value="Arapiraca, Brazil" />
                    </div>
                </div>

                <motion.form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className="p-8 md:p-12 space-y-6 border border-border rounded-3xl bg-white"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <div className="space-y-2">
                        <label htmlFor="contact-name" className="text-sm font-bold uppercase tracking-widest">
                            {t("name")}
                        </label>
                        <input
                            id="contact-name"
                            name="from_name"
                            type="text"
                            placeholder={t("name")}
                            required
                            className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-ink transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="contact-email" className="text-sm font-bold uppercase tracking-widest">
                            {t("email")}
                        </label>
                        <input
                            id="contact-email"
                            name="from_email"
                            type="email"
                            placeholder="hello@example.com"
                            required
                            className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-ink transition-colors"
                        />
                    </div>
                    <div className="space-y-2">
                        <label htmlFor="contact-message" className="text-sm font-bold uppercase tracking-widest">
                            {t("message")}
                        </label>
                        <textarea
                            id="contact-message"
                            name="message"
                            rows={4}
                            placeholder={t("message")}
                            required
                            className="w-full border border-border rounded-xl px-4 py-3 outline-none focus:border-ink transition-colors resize-none"
                            readOnly={false}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={formStatus !== "idle"}
                        onMouseEnter={() => sendIconRef.current?.startAnimation()}
                        onMouseLeave={() => sendIconRef.current?.stopAnimation()}
                        className="w-full py-4 bg-ink text-paper rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50"
                    >
                        {formStatus === "idle" && (
                            <>
                                <SendIcon ref={sendIconRef} size={18} className="text-paper" /> {t("send")}
                            </>
                        )}
                        {formStatus === "sending" && t("sending")}
                        {formStatus === "sent" && t("sent")}
                        {formStatus === "error" && t("sendError")}
                    </button>
                </motion.form>
            </div>
        </section>
    );
}
