import { HomeCards } from "@/components/home-cards";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <HomeCards />
      <div className="px-4 lg:px-6"></div>
    </div>
  );
};

export default HomePage;
