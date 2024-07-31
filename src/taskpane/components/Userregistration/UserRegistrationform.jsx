import React, { useState } from "react";
import {
  PageContainer,
  LogoContainer,
  ContentContainer,
  Logo,
  ThemeBorder,
  RedRec,
  WhiteRec,
  Heading,
  Form,
  InputContainer,
  Label,
  Input,
  Textarea,
  ButtonContainer,
  Button,
} from "./UserRegistrationformstyles";

const UserRegistrationForm = ({ setPageValue }) => {
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
    setPageValue("Submitpage");
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
        <Heading>Inquiry Form</Heading>
        <Form onSubmit={handleSubmit}>
          <InputContainer>
            <Label htmlFor="firstName">First name</Label>
            <Input type="text" name="firstName" placeholder="First name" required />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="lastName">Last name</Label>
            <Input type="text" name="lastName" placeholder="Last name" required />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="email">Email id</Label>
            <Input type="email" name="email" placeholder="Email id" required />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="company">Company associated with</Label>
            <Input type="text" name="company" placeholder="Company associated with" required />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="majorAreaOfWork">Major area of work</Label>
            <Input type="text" name="majorAreaOfWork" placeholder="Major area of work" required />
          </InputContainer>
          <InputContainer>
            <Label htmlFor="message">Leave a message</Label>
            <Textarea name="message" placeholder="Leave a message" required />
          </InputContainer>
          <ButtonContainer>
            <Button type="submit">Submit</Button>
            <Button type="button" onClick={() => setPageValue("UserLogin")}>Login</Button>
          </ButtonContainer>
        </Form>
      </ContentContainer>
    </PageContainer>
  );
};

export default UserRegistrationForm;
