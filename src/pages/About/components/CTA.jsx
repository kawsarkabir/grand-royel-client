import { Button } from "@/components/ui/button";
import { Link } from "react-router";

export default function CTA() {
    return (
        <section className="pt-20 pb-28 bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience Luxury?</h2>
                <p className="text-xl mb-8 text-primary-foreground/90 max-w-2xl mx-auto leading-relaxed">
                    Join millions of satisfied guests who have chosen Grand Royal Hotel for their most important moments.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link to="/rooms">
                        <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                            Book Your Stay
                        </Button></Link>
                    <Link to="/contact">
                        <Button size="lg" variant="outline" className="border-white  hover:bg-white hover:text-primary text-black">
                            Contact Us
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}