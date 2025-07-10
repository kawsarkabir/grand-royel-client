import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaClock
} from "react-icons/fa";
const contactInfo = [
    {
        icon: FaPhone,
        title: "Phone",
        details: ["+1 (555) 123-4567", "+1 (555) 123-4568"],
        description: "24/7 Support Available"
    },
    {
        icon: FaEnvelope,
        title: "Email",
        details: ["info@grandroyalhotel.com", "reservations@grandroyalhotel.com"],
        description: "Response within 2 hours"
    },
    {
        icon: FaMapMarkerAlt,
        title: "Location",
        details: ["123 Luxury Boulevard", "Downtown, New York, NY 10001"],
        description: "Prime city center location"
    },
    {
        icon: FaClock,
        title: "Reception Hours",
        details: ["24/7 Front Desk", "Concierge: 6 AM - 12 AM"],
        description: "Always here to assist you"
    }
];

export default function QuickContact() {
    return (
        <section className="py-16 bg-card">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {contactInfo.map((info, index) => (
                        <Card key={index} className="border-0 shadow-card bg-background hover:shadow-elegant transition-all duration-300 group">
                            <CardContent className="p-6 text-center">
                                <info.icon className="h-8 w-8 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                                <h3 className="font-bold mb-3 text-foreground">{info.title}</h3>
                                {info.details.map((detail, idx) => (
                                    <p key={idx} className="text-sm text-muted-foreground mb-1">{detail}</p>
                                ))}
                                <Badge variant="outline" className="mt-2 text-xs">{info.description}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

    );
}