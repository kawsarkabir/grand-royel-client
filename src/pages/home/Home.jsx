import { HeroSlider } from './components/HeroSlider';
import { SpecialOffersModal } from './components/SpecialOffersModal';
import { FeaturedRooms } from './components/FeaturedRooms';
import { UserReviewsCarousel } from './components/UserReview';
import HotelMap from './components/HotelMap';
import { Title } from 'react-head';
import AmenitiesSection from './components/AmenitiesSection';
import CommitmentSection from './components/CommitmentSection';

export default function Home() {
  return (
    <>
      <Title> Grand Royel | Home </Title>
      <HeroSlider />
      <SpecialOffersModal />
      <AmenitiesSection />
      <FeaturedRooms />
      <CommitmentSection />
      <UserReviewsCarousel />
      <HotelMap />
    </>
  );
}
