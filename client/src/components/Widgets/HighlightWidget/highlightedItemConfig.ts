import axios from 'axios';
import apiConfig from "../../../api-config";  // Make sure to update the path if necessary

const HighlightedItemConfig = {
  item: "Zip Ties 8 inch (1000 Pack), 40lbs Tensile Strength, Black Cable Ties, Wire Ties for indoor and outdoor use, by Skalon" // Change this to any item name to test
};

const fetchSaleConfig = async () => {
  try {
    const response = await axios.get(`${apiConfig.API_URL}/sales/${HighlightedItemConfig.item}`);
    const saleData = response.data;

    if (saleData) {
      const saleEndTime = new Date(saleData.saleDuration).getTime();
      const currentTime = new Date().getTime();
      const remainingTimeInHours = (saleEndTime - currentTime) / (1000 * 60 * 60);

      (HighlightedItemConfig as any).saleDurationInHours = remainingTimeInHours > 0 ? remainingTimeInHours : 0;
    }
  } catch (error) {
    console.error('Error fetching sale config:', error);
  }
};

fetchSaleConfig();

export default HighlightedItemConfig;
