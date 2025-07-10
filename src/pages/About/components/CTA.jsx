import { Button } from "@/components/ui/button";

export default function CTA() {
    return (
        <section className="py-20 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Luxury?</h2>
                <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                    Join millions of satisfied guests who have chosen Grand Royal Hotel for their most important moments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                        Book Your Stay
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                        Contact Us
                    </Button>
                </div>
            </div>
        </section>
    );
}