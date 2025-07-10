import { Badge } from "@/components/ui/badge";

export default function ContactHero() {
    return (
        <section className="h-[60vh] md:h-[80vh] lg:h-[91vh] relative bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative container mx-auto px-4 py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                        Get In Touch
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Contact Our
                        <span className="block text-accent">Expert Team</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
                        We&rsquo;re here to help make your stay unforgettable. Reach out to us anytime for assistance, bookings, or inquiries.
                    </p>
                </div>
            </div>
        </section>
    );
}