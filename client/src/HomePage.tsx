import "bootstrap/dist/css/bootstrap.min.css";

import FeaturedSection from "./FeaturedSection";
import NewSection from "./NewSection";
import DeviceDetector from "./DeviceDetector";
import CategoriesSection from "./CategoriesSection";

const HomePage = () => {
	return (
		<>
			<DeviceDetector />
			<CategoriesSection />
			<FeaturedSection />
			<NewSection />
		</>
	);
};

export default HomePage;
