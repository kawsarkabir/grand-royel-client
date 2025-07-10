import { Card, CardContent } from "@/components/ui/card";
import { FaAward, FaGlobe, FaHotel, FaUsers } from "react-icons/fa6";

const stats = [
    { number: "500+", label: "Luxury Rooms", icon: FaHotel },
    { number: "50+", label: "Countries Served", icon: FaGlobe },
    { number: "1M+", label: "Happy Guests", icon: FaUsers },
    { number: "25+", label: "Years Experience", icon: FaAward },
];

export default function Stats() {
    return (
        <section className="py-16 bg-card">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {stats.map((stat, index) => (
                        <Card key={index} className="text-center border-0 shadow-card bg-background hover:shadow-elegant transition-all duration-300">
                            <CardContent className="p-6">
                                <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                                <div className="text-3xl font-bold text-primary mb-2">{stat.number}</div>
                                <div className="text-muted-foreground font-medium">{stat.label}</div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}