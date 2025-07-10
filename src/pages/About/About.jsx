import AboutHero from "./components/AboutHero";
import Stats from "./components/Stats";
import Story from "./components/Story";
import Mission from "./components/Mission";
import Amenities from "./components/Amenities";
import CTA from "./components/CTA";

const About = () => {
    return (
        <div >
            <AboutHero />
            <Stats />
            <Story />
            <Mission />
            <Amenities />
            <CTA />
        </div>
    );
};

export default About;