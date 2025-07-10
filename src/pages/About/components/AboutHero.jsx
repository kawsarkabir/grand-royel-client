import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa6";

export default function AboutHero() {
    return (
        <section className="relative bg-gradient-to-r from-primary to-primary-glow text-primary-foreground">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative container mx-auto px-4 py-24">
                <div className="max-w-3xl mx-auto text-center">
                    <Badge variant="secondary" className="mb-4 bg-white/20 text-white border-white/30">
                        Since 1999
                    </Badge>
                    <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                        Where Luxury Meets
                        <span className="block text-accent">Exceptional Service</span>
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 leading-relaxed">
                        Experience unparalleled hospitality at Grand Royal Hotel, where every stay becomes an unforgettable memory.
                    </p>
                    <Button size="lg" variant="secondary" className="bg-white text-primary hover:bg-white/90">
                        Discover Our Story
                        <FaHeart className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}