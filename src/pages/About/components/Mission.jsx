import { Card, CardContent } from "@/components/ui/card";
import { FaShieldAlt } from "react-icons/fa";
import { FaAward, FaHeart } from "react-icons/fa6";

export default function Mission() {
    return (
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
    );
}