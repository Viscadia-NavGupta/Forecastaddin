import React from "react";
import {
  Logo,
  UsernameInputContainer,
  ThemeBorder,
  RedRec,
  WhiteRec,
  Container,
  Heading,
  Button,
} from "./submitpagestyles";

const Submitpage = ({ setPageValue }) => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      majorAreaOfWork: formData.get("majorAreaOfWork"),
      message: formData.get("message"),
    };
    console.log(data); // Send this data to your backend
  };

  return (
    <div>
      <UsernameInputContainer>
        <Logo src="/../assets/viscadialogo.png" alt="Viscadia Logo" />
        <ThemeBorder>
          <WhiteRec />
          <RedRec />
        </ThemeBorder>
      </UsernameInputContainer>

      <Container>
        <Heading>
          Thank you for submitting your request! Our team is reviewing it and will get back to you shortly. We appreciate your patience.
        </Heading>
        <div>
          <Button type="button" onClick={() => setPageValue("UserLogin")}>
            Login Page
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default Submitpage;
