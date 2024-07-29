import styled from "styled-components"
import ServiceCard from "../Cards/ServiceCard"
import Truck from '../../assets/images/truck-icon.png';
import Contractor from '../../assets/images/contractor-icon.png';
import Rental from '../../assets/images/tool-rental-icon.png';
import Installation from '../../assets/images/installation-icon.png';

const Group = styled.div`
    width: 1050px;
    height: auto;
    flex-shrink: 0;
`
const SectionHeadline = styled.div`
    display: flex;
    width: 1050px;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
`
const CardRow = styled.div`
    display: inline-flex;
    align-items: flex-start;
    gap: 30px;
    margin-top: 40px;
`
const H3 = styled.h3`
    align-self: stretch;

    color: white;

    /* H3 - Work Sans */
    font-family: "Work Sans";
    font-size: 38px;
    font-style: normal;
    font-weight: 600;
    line-height: 120%; /* 45.6px */
    text-transform: capitalize;
`
const P = styled.p`
    align-self: stretch;

    color: white;

    /* Body Text- Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: 160%; /* 35.2px */
    text-transform: capitalize;
`
const ServicesSection = () => {

    const servicesInfo  = [
        {icon: Truck, title: "Deliveries", description: "Fast and reliable product delivery service."},
        {icon: Contractor, title: "Contractor Services", description: "Professional services for your construction needs."},
        {icon: Rental, title: "Tool Rentals", description: "A wide range of tools available for rent."},
        {icon: Installation, title: "Installation Services", description: "Expert installation services for various products."},
    ]
    return (
        <Group>
          <SectionHeadline>
            <H3>Our Services</H3>
            <P>Discover the Range of Solutions We Offer</P>
          </SectionHeadline>
          <CardRow>
            {servicesInfo.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
              />
            ))}
          </CardRow>
        </Group>
      );
    };
    
export default ServicesSection;