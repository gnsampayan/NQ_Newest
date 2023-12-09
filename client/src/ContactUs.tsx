import styled from "styled-components";

const Wrapper = styled.div`
  color: white;
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 40px auto;
`;

const Title = styled.h2`
  color: #fff;
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
  background-color: #0066cc;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ContactUs = () => {
  return (
    <Wrapper>
      <Title>Contact Us</Title>
      <Form>
        <Input type="text" placeholder="Your Name" />
        <Input type="email" placeholder="Your Email" />
        <TextArea placeholder="Your Message" rows={6} />
        <SubmitButton type="submit">Send Message</SubmitButton>
      </Form>
    </Wrapper>
  )
};

export default ContactUs;

