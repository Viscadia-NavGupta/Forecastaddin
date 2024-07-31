import React from "react";
import {
  PageContainer,
  LogoContainer,
  ContentContainer,
  Logo,
  ThemeBorder,
  RedRec,
  WhiteRec,
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
    <PageContainer>
      <LogoContainer>
        <Logo src="/../assets/viscadialogo.png" alt="Viscadia Logo" />
        <ThemeBorder>
          <WhiteRec />
          <RedRec />
        </ThemeBorder>
      </LogoContainer>

      <ContentContainer>
        <Heading>
          Thank you for submitting your request! Our team is reviewing it and will get back to you shortly. We appreciate your patience.
        </Heading>
        <div>
          <Button type="button" onClick={() => setPageValue("UserLogin")}>
            Login Page
          </Button>
        </div>
      </ContentContainer>
    </PageContainer>
  );
};

export default Submitpage;
