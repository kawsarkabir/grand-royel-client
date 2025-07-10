import ContactHero from "./components/ContactHero";
import QuickContact from "./components/QuickContact";
import ContactFAQ from "./components/ContactFAQ";
import ContactForm from "./components/ContactForm";

export default function Contact() {
    return (
        <div className="bg-background">
            <ContactHero />
            <QuickContact />
            <ContactForm />
            <ContactFAQ />
        </div>
    );
};

