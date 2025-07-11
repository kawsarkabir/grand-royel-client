import { FaStar } from 'react-icons/fa6';
import { Smile } from 'lucide-react';
import { BrushCleaningIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i = 0) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.6,
            ease: 'easeOut',
        },
    }),
};

export default function CommitmentSection() {
    return (
        <section className="py-12 lg:pb-16">
            <div className="container px-4 md:px-6 text-center mx-auto">
                <motion.div
                    className="space-y-4"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                >
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                        Our Commitment to Excellence
                    </h2>
                    <p className="max-w-[900px] mx-auto text-muted-foreground md:text-xl/relaxed">
                        We are dedicated to providing exceptional service and creating
                        memorable experiences for every guest. Our team is committed to
                        ensuring your comfort and satisfaction throughout your stay.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {[ // card data loop
                        {
                            icon: <FaStar className="h-12 w-12 text-primary" />,
                            title: '5-Star Service',
                            desc: 'Experience world-class hospitality from our dedicated staff, ready to cater to your every need.',
                        },
                        {
                            icon: <BrushCleaningIcon className="h-12 w-12 text-primary" />,
                            title: 'Impeccable Cleanliness',
                            desc: 'We maintain the highest standards of hygiene and cleanliness for your peace of mind.',
                        },
                        {
                            icon: <Smile className="h-12 w-12 text-primary" />,
                            title: 'Ultimate Comfort',
                            desc: 'Our rooms are designed for maximum comfort, ensuring a restful and rejuvenating stay.',
                        },
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center space-y-4 p-6 bg-card rounded-lg shadow-sm"
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={fadeUp}
                        >
                            {item.icon}
                            <h3 className="text-xl font-semibold">{item.title}</h3>
                            <p className="text-muted-foreground text-center">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
