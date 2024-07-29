import styled from "styled-components";
import Footer from "./components/Home/Footer";

const Wrapper = styled.div<Props>`
  position: relative;
  margin-left: ${props => props.$margin};
  margin-right: auto;
  z-index: 20;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 100px;
  padding-top: 40px;
`;

const Group = styled.div`
  color: white;
  background-color: #f2f2f2;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 600px;
  margin: 40px auto;
`;

const Title = styled.h2`
  color: black;
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
`;

const TextArea = styled.textarea`
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 16px;
  resize: vertical;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  color: black;
  background-color: #dbdbdb;;
  border: solid 1px black;
  border-radius: 100vw;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(162, 89, 255, 0.4);
  }
`;
interface Props {
  $margin: string;
}
const ContactUs: React.FC<Props> = ({ $margin }) => {
  return (
    <>
      <Wrapper $margin={$margin}>
        <Group>
          <Title>Contact Us</Title>
          <Form>
            <Input type="text" placeholder="Your Name" />
            <Input type="email" placeholder="Your Email" />
            <TextArea placeholder="Your Message" rows={6} />
            <SubmitButton type="submit">Send Message</SubmitButton>
          </Form>
        </Group>
        <Footer />
      </Wrapper>
    </>
  )
};

export default ContactUs;

