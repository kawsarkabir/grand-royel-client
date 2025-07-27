import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import { motion } from 'framer-motion';

const slideIn = {
    hidden: {
        opacity: 0,
        x: -100,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20
        }
    },
    visible: (i = 0) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: i * 0.2,
            type: 'spring',
            stiffness: 100,
            damping: 20,
            mass: 1,
            velocity: 50
        }
    })
};

const slideInRight = {
    hidden: {
        opacity: 0,
        x: 100,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 20
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            delay: 0.4,
            type: 'spring',
            stiffness: 100,
            damping: 20,
            mass: 1,
            velocity: 50
        }
    }
};

export default function AmenitiesSection() {
    return (
        <section className="py-12 lg:pb-16 bg-muted overflow-x-hidden">
            <div className="container px-4 md:px-6 mx-auto">
                <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
                    <div className="space-y-4">
                        <motion.h2
                            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideIn}
                            custom={0}
                        >
                            Discover Our Exceptional Amenities
                        </motion.h2>

                        <motion.p
                            className="max-w-[700px] text-muted-foreground md:text-xl/relaxed"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideIn}
                            custom={1}
                        >
                            At Hotelio, we believe in providing an unparalleled experience.
                            Explore our wide range of amenities designed to make your stay
                            unforgettable.
                        </motion.p>

                        <motion.ul
                            className="grid gap-2 text-lg text-muted-foreground"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideIn}
                            custom={2}
                        >
                            {[
                                'State-of-the-art Fitness Center',
                                'Luxurious Spa & Wellness Services',
                                'Gourmet Dining Options',
                                'Sparkling Outdoor Pool',
                            ].map((item, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-center gap-2"
                                    custom={index + 2}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, margin: "-100px" }}
                                    variants={slideIn}
                                >
                                    <CheckCircle className="h-5 w-5 text-primary" />
                                    {item}
                                </motion.li>
                            ))}
                        </motion.ul>

                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={slideIn}
                            custom={6}
                        >
                            <Link to="/rooms">
                                <Button size="lg" className="mt-4">Explore Rooms</Button>
                            </Link>
                        </motion.div>
                    </div>

                    <motion.img
                        src="https://image.pollinations.ai/prompt/Discover%20Our%20Exceptional%20Amenities?width=1024&height=1024&seed=31321&model=flux"
                        width={700}
                        height={500}
                        alt="Hotel Amenities"
                        className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full shadow-lg"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={slideInRight}
                    />
                </div>
            </div>
        </section>
    );
}