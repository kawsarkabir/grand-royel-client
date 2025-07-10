import { Card, CardContent } from "@/components/ui/card";
import { FaShieldAlt } from "react-icons/fa";
import { FaAward } from "react-icons/fa6";

export default function Story() {
    return (
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
                                the world&rsquo;s most prestigious hotel brands.
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
                                    <li>• World&rsquo;s Leading Hotel Brand 2023</li>
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
    );
}