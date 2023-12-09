import styled from "styled-components";

const Wrapper = styled.div`
  color: white;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 800px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  color: #fff;
  text-align: center;
  margin-bottom: 20px;
`;

const ServiceContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

const ServiceBox = styled.div`
  background-color: #444;
  padding: 20px;
  border-radius: 5px;
  width: 200px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  &:hover {
    background-color: #555;
    cursor: pointer;
  }
`;

const Services = () => {
  return (
    <Wrapper>
      <Title>Our Services</Title>
      <ServiceContainer>
        <ServiceBox>
          <h3>Deliveries</h3>
          <p>Fast and reliable product delivery service.</p>
        </ServiceBox>
        <ServiceBox>
          <h3>Contractor Services</h3>
          <p>Professional services for your construction needs.</p>
        </ServiceBox>
        <ServiceBox>
          <h3>Tool Rentals</h3>
          <p>A wide range of tools available for rent.</p>
        </ServiceBox>
        <ServiceBox>
          <h3>Installation Services</h3>
          <p>Expert installation services for various products.</p>
        </ServiceBox>
        {/* Add more services as needed */}
      </ServiceContainer>
    </Wrapper>
  )
};

export default Services;
