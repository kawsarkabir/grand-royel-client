import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FaWifi,
    FaSwimmingPool,
    FaCar,
    FaUtensils,
    FaSpa,
    FaShieldAlt,
    FaAward,
    FaHeart
} from "react-icons/fa";
import { MdRoomService, MdFitnessCenter, MdBusinessCenter } from "react-icons/md";
import AboutHero from "./components/AboutHero";
import Stats from "./components/Stats";

const About = () => {
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



    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <AboutHero />

            {/* Stats Section */}
            <Stats />

            {/* Story Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Story</h2>
                            <p className="text-xl text-muted-foreground leading-relaxed">
                                A legacy of excellence spanning over two decades
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-foreground">A Heritage of Hospitality</h3>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Founded in 1999, Grand Royal Hotel has been setting the standard for luxury hospitality.
                                    What began as a vision to create an extraordinary guest experience has evolved into one of
                                    the world's most prestigious hotel brands.
                                </p>
                                <p className="text-muted-foreground mb-6 leading-relaxed">
                                    Our commitment to excellence, attention to detail, and genuine care for our guests has
                                    earned us numerous international awards and the loyalty of discerning travelers worldwide.
                                </p>
                                <div className="flex items-center gap-4">
                                    <FaShieldAlt className="h-6 w-6 text-primary" />
                                    <span className="text-foreground font-medium">Trusted by millions worldwide</span>
                                </div>
                            </div>
                            <Card className="border-0 shadow-card bg-gradient-subtle">
                                <CardContent className="p-8">
                                    <FaAward className="h-12 w-12 text-primary mb-4" />
                                    <h4 className="text-xl font-bold mb-4 text-foreground">Awards & Recognition</h4>
                                    <ul className="space-y-3 text-muted-foreground">
                                        <li>• World's Leading Hotel Brand 2023</li>
                                        <li>• Excellence in Customer Service Award</li>
                                        <li>• Sustainable Tourism Champion</li>
                                        <li>• Best Luxury Hotel Chain</li>
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-20 bg-card">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Our Mission & Values</h2>
                        <p className="text-xl text-muted-foreground leading-relaxed">
                            Dedicated to creating exceptional experiences that exceed expectations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <Card className="border-0 shadow-card bg-background text-center hover:shadow-elegant transition-all duration-300">
                            <CardContent className="p-8">
                                <FaHeart className="h-10 w-10 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-foreground">Guest-Centric</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Every decision we make is guided by our commitment to creating memorable experiences for our guests.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-card bg-background text-center hover:shadow-elegant transition-all duration-300">
                            <CardContent className="p-8">
                                <FaAward className="h-10 w-10 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-foreground">Excellence</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    We strive for perfection in every detail, from service delivery to facility maintenance.
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-card bg-background text-center hover:shadow-elegant transition-all duration-300">
                            <CardContent className="p-8">
                                <FaShieldAlt className="h-10 w-10 text-primary mx-auto mb-4" />
                                <h3 className="text-xl font-bold mb-4 text-foreground">Integrity</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    Trust and transparency form the foundation of all our relationships with guests and partners.
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            {/* Amenities Section */}
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
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

            {/* CTA Section */}
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
        </div>
    );
};

export default About;