import ContactHero from "./components/ContactHero";
import QuickContact from "./components/QuickContact";
import ContactFAQ from "./components/ContactFAQ";
import ContactForm from "./components/ContactForm";
import { Title } from "react-head";

export default function Contact() {
    return (
        <div className="bg-background">
            <Title> Grand Royel | Contact </Title>
            <ContactHero />
            <QuickContact />
            <ContactForm />
            <ContactFAQ />
        </div>
    );
};

