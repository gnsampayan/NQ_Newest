import styled from "styled-components"

const Card = styled.div`
    display: flex;
    padding: 10px 30px 30px 30px;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    flex: 1 0 0;

    border-radius: 20px;
    background: #3B3B3B;
    width: 240px;
`
const Icon = styled.div`
    width: auto;
    height: auto;
`
const CardDetails = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    align-self: stretch;
`
const H5 = styled.h5`
    align-self: stretch;

    color: #FFF;
    text-align: center;

    /* H5 - Work Sans */
    font-family: "Work Sans";
    font-size: 22px;
    font-style: normal;
    font-weight: 600;
    line-height: 140%; /* 30.8px */
    text-transform: capitalize;
`
const P = styled.p`
    align-self: stretch;

    color: white;
    text-align: center;

    /* Base(Body) - Work Sans */
    font-family: "Work Sans";
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 22.4px */
`
interface Props {
    icon: React.ReactNode;
    title: string;
    description: string;
}
const ServiceCard = ({ icon, title, description } : Props) => {
  return (
    <>
        <Card>
            <Icon>{icon}</Icon>
            <CardDetails>
                <H5>{title}</H5>
                <P>{description}</P>
            </CardDetails>
        </Card>
    </>
  )
}

export default ServiceCard