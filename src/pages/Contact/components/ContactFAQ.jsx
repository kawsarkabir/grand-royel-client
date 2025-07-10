import { Card, CardContent } from "@/components/ui/card";

export default function ContactFAQ() {
    return (
        <>
            <section className="py-20 bg-card">
                <div className="container mx-auto px-4">
                    <div className="max-w-3xl mx-auto text-center mb-12">
                        <h2 className="text-4xl font-bold mb-6 text-foreground">Frequently Asked Questions</h2>
                        <p className="text-muted-foreground">Quick answers to common questions</p>
                    </div>

                    <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
                        <Card className="border-0 shadow-card bg-background">
                            <CardContent className="p-6">
                                <h4 className="font-bold mb-3 text-foreground">What are your check-in/check-out times?</h4>
                                <p className="text-muted-foreground text-sm">Check-in: 3:00 PM | Check-out: 12:00 PM. Early check-in and late check-out may be available upon request.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-card bg-background">
                            <CardContent className="p-6">
                                <h4 className="font-bold mb-3 text-foreground">Do you offer airport transportation?</h4>
                                <p className="text-muted-foreground text-sm">Yes, we provide complimentary shuttle service to/from the airport. Please contact us 24 hours in advance to arrange pickup.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-card bg-background">
                            <CardContent className="p-6">
                                <h4 className="font-bold mb-3 text-foreground">What is your cancellation policy?</h4>
                                <p className="text-muted-foreground text-sm">Free cancellation up to 24 hours before arrival. Cancellations made within 24 hours are subject to a one-night charge.</p>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-card bg-background">
                            <CardContent className="p-6">
                                <h4 className="font-bold mb-3 text-foreground">Are pets allowed?</h4>
                                <p className="text-muted-foreground text-sm">We welcome well-behaved pets in designated pet-friendly rooms. Additional fees apply. Please inform us during booking.</p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>
        </>
    );
}