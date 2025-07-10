import { Card, CardContent } from "@/components/ui/card";
import {
    FaWifi,
    FaSwimmingPool,
    FaCar,
    FaUtensils,
    FaSpa,
} from "react-icons/fa";
import { MdBusinessCenter, MdFitnessCenter, MdRoomService } from "react-icons/md";
const amenities = [
    { icon: FaWifi, name: "Free Wi-Fi", description: "High-speed internet throughout the property" },
    { icon: FaSwimmingPool, name: "Swimming Pool", description: "Outdoor pool with panoramic city views" },
    { icon: FaCar, name: "Valet Parking", description: "Complimentary valet parking service" },
    { icon: FaUtensils, name: "Fine Dining", description: "Award-winning restaurant with international cuisine" },
    { icon: FaSpa, name: "Luxury Spa", description: "Full-service spa and wellness center" },
    { icon: MdFitnessCenter, name: "Fitness Center", description: "24/7 state-of-the-art fitness facility" },
    { icon: MdRoomService, name: "Room Service", description: "24-hour in-room dining service" },
    { icon: MdBusinessCenter, name: "Business Center", description: "Modern business facilities and meeting rooms" },
];

export default function Amenities() {
    return (
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div>
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">World-Class Amenities</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Indulge in luxury with our comprehensive range of premium facilities
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {amenities.map((amenity, index) => (
                            <Card key={index} className="border-0 shadow-card bg-card hover:shadow-elegant transition-all duration-300 group">
                                <CardContent className="p-6 text-center">
                                    <amenity.icon className="h-8 w-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                                    <h4 className="font-bold mb-2 text-foreground">{amenity.name}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{amenity.description}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}