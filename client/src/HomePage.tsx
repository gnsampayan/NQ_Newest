import "bootstrap/dist/css/bootstrap.min.css";
import DeviceDetector from "./DeviceDetector";
import styled from "styled-components";

const Wrapper = styled.div<HomePageProps>`
	position: relative;
 	margin-left: ${props => props.margin};
	margin-right: auto;
	margin-bottom: 100px;
	z-index: 20;
`;

interface HomePageProps {
	margin: string;
}

const HomePage: React.FC<HomePageProps> = ({ margin }) => {
	return (
		<>
			<Wrapper margin={margin} >
				<DeviceDetector />
			</Wrapper>
		</>
	);
};

export default HomePage;
