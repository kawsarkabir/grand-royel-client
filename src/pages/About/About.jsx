import AboutHero from "./components/AboutHero";
import Stats from "./components/Stats";
import Story from "./components/Story";
import Mission from "./components/Mission";
import Amenities from "./components/Amenities";
import CTA from "./components/CTA";
import { Title } from "react-head";

export default function Home() {
    return (
        <>
            <Title> Grand Royel | About </Title>
            <AboutHero />
            <Stats />
            <Story />
            <Mission />
            <Amenities />
            <CTA />
        </>
    );
};
