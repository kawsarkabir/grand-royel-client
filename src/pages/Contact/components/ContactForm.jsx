import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MdBusinessCenter, MdLocalHotel, MdEventNote } from "react-icons/md";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaConciergeBell,
    FaHeadset,
    FaGift,
    FaMapMarkerAlt
} from "react-icons/fa";
import { useState } from "react";
import { toast } from "sonner";
import { FaPhone } from "react-icons/fa6";



export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        inquiryType: "general"
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the form data to your backend
        toast.success({
            title: "Message Sent Successfully!",
            description: "Thank you for contacting us. We'll get back to you within 24 hours.",
        });


        // Reset form
        setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
            inquiryType: "general"
        });
    };
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const departments = [
        { icon: MdLocalHotel, name: "Room Reservations", email: "reservations@grandroyalhotel.com", color: "bg-primary" },
        { icon: MdEventNote, name: "Events & Conferences", email: "events@grandroyalhotel.com", color: "bg-accent" },
        { icon: MdBusinessCenter, name: "Corporate Bookings", email: "corporate@grandroyalhotel.com", color: "bg-secondary" },
        { icon: FaConciergeBell, name: "Concierge Services", email: "concierge@grandroyalhotel.com", color: "bg-primary" },
        { icon: FaHeadset, name: "Customer Support", email: "support@grandroyalhotel.com", color: "bg-accent" },
        { icon: FaGift, name: "Special Packages", email: "packages@grandroyalhotel.com", color: "bg-secondary" }
    ];
    const socialLinks = [
        { icon: FaFacebookF, name: "Facebook", url: "#", color: "hover:text-blue-600" },
        { icon: FaTwitter, name: "Twitter", url: "#", color: "hover:text-blue-400" },
        { icon: FaInstagram, name: "Instagram", url: "#", color: "hover:text-pink-600" },
        { icon: FaLinkedinIn, name: "LinkedIn", url: "#", color: "hover:text-blue-700" }
    ];

    return (
        <>
            <section className="py-20">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12">

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <Card className="border-0 shadow-elegant bg-card">
                                <CardHeader className="pb-6">
                                    <CardTitle className="text-3xl font-bold text-foreground">Send us a Message</CardTitle>
                                    <p className="text-muted-foreground">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="name" className="text-foreground font-medium">Full Name *</Label>
                                                <Input
                                                    id="name"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-2"
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email" className="text-foreground font-medium">Email Address *</Label>
                                                <Input
                                                    id="email"
                                                    name="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="mt-2"
                                                    placeholder="john@example.com"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-4">
                                            <div>
                                                <Label htmlFor="phone" className="text-foreground font-medium">Phone Number</Label>
                                                <Input
                                                    id="phone"
                                                    name="phone"
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    className="mt-2"
                                                    placeholder="+1 (555) 123-4567"
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="inquiryType" className="text-foreground font-medium">Inquiry Type</Label>
                                                <select
                                                    id="inquiryType"
                                                    name="inquiryType"
                                                    value={formData.inquiryType}
                                                    onChange={handleInputChange}
                                                    className="mt-2 w-full px-3 py-2 border border-input bg-background rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                                                >
                                                    <option value="general">General Inquiry</option>
                                                    <option value="reservation">Room Reservation</option>
                                                    <option value="events">Events & Conferences</option>
                                                    <option value="corporate">Corporate Bookings</option>
                                                    <option value="complaint">Feedback/Complaint</option>
                                                </select>
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="subject" className="text-foreground font-medium">Subject *</Label>
                                            <Input
                                                id="subject"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-2"
                                                placeholder="How can we help you?"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="message" className="text-foreground font-medium">Message *</Label>
                                            <Textarea
                                                id="message"
                                                name="message"
                                                value={formData.message}
                                                onChange={handleInputChange}
                                                required
                                                className="mt-2 min-h-[120px]"
                                                placeholder="Please provide details about your inquiry..."
                                            />
                                        </div>

                                        <Button type="submit" size="lg" className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90">
                                            Send Message
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar Information */}
                        <div className="space-y-8">

                            {/* Department Contacts */}
                            <Card className="border-0 shadow-card bg-card">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-foreground">Department Contacts</CardTitle>
                                    <p className="text-muted-foreground text-sm">Direct contacts for specific services</p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {departments.map((dept, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                            <div className={`${dept.color} p-2 rounded-lg`}>
                                                <dept.icon className="h-4 w-4 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="font-medium text-foreground text-sm">{dept.name}</h4>
                                                <p className="text-xs text-muted-foreground truncate">{dept.email}</p>
                                            </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>

                            {/* Emergency Contact */}
                            <Card className="border-0 shadow-card bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
                                <CardContent className="p-6">
                                    <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                                        <FaPhone className="h-4 w-4 text-destructive" />
                                        Emergency Contact
                                    </h3>
                                    <p className="text-2xl font-bold text-destructive mb-1">911</p>
                                    <p className="text-sm text-muted-foreground mb-3">For immediate assistance</p>
                                    <Separator className="my-3" />
                                    <p className="text-sm text-muted-foreground">Hotel Security: +1 (555) 123-9999</p>
                                </CardContent>
                            </Card>

                            {/* Social Media */}
                            <Card className="border-0 shadow-card bg-card">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-foreground">Follow Us</CardTitle>
                                    <p className="text-muted-foreground text-sm">Stay connected with our latest updates</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-3">
                                        {socialLinks.map((social, index) => (
                                            <Button
                                                key={index}
                                                variant="outline"
                                                size="icon"
                                                className={`hover:scale-110 transition-all duration-300 ${social.color}`}
                                                asChild
                                            >
                                                <a href={social.url} aria-label={social.name}>
                                                    <social.icon className="h-4 w-4" />
                                                </a>
                                            </Button>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Map Placeholder */}
                            <Card className="border-0 shadow-card bg-card">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-foreground">Find Us</CardTitle>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="h-48 bg-muted rounded-b-lg flex items-center justify-center">
                                        <div className="text-center">
                                            <FaMapMarkerAlt className="h-8 w-8 text-primary mx-auto mb-2" />
                                            <p className="text-muted-foreground text-sm">Interactive Map</p>
                                            <p className="text-xs text-muted-foreground">123 Luxury Boulevard, Downtown</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}