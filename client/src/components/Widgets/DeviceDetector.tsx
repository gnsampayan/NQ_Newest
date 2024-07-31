import React, { useEffect, useState } from "react";
import styled from "styled-components";

const DebugText = styled.p`
	color: white;
`;

const DeviceDetector: React.FC = () => {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const checkIsMobile = () => {
			const isMobileDevice =
				"ontouchstart" in window ||
				(window.matchMedia && window.matchMedia("(max-width: 768px)").matches);
			setIsMobile(isMobileDevice);
		};

		checkIsMobile();

		const handleResize = () => {
			checkIsMobile();
		};

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div>
			{isMobile ? (
				<DebugText>Mobile device</DebugText>
			) : (
				<DebugText>Desktop device</DebugText>
			)}
		</div>
	);
};

export default DeviceDetector;
