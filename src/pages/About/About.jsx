import AboutHero from "./components/AboutHero";
import Stats from "./components/Stats";
import Story from "./components/Story";
import Mission from "./components/Mission";
import Amenities from "./components/Amenities";

const About = () => {
    return (
        <div className="min-h-screen bg-background">
            <AboutHero />
            <Stats />
            <Story />
            <Mission />
            <Amenities />
        </div>
    );
};

export default About;