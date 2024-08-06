import React, { useState } from "react";
import {
  Container,
  Logo,
  UsernameInputContainer,
  ThemeBorder,
  RedRec,
  WhiteRec,
  Rec,
  ErrorMessage,
  Heading,
  UserProfileButton,
  UserProfileButtonInner,
  InputContainer,
  InputContainerInput,
  HelperTextContainer,
  InputHelperText,
  ContactUsButton,
  ButtonfButton,
  Footer,
  LoginContainer,
  RememberForgotContainer,
  RememberMeLabel,
  ForgotPasswordLink,
  ContactUsLink
} from "./UserLoginStyles";
import * as AWSConnections from "../AWS Midleware/AWSConnections";

const UserLogin = ({ handleLogin, setPageValue }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleProceedClick = async () => {
    if (!username.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const result = await AWSConnections.getCognitoAccessToken(username, "overarching");

    if (result.success) {
      setErrorMessage("");
      sessionStorage.setItem("username", username);
      handleLogin(); // Call handleLogin from props
    } else {
      setErrorMessage(result.message);
    }
  };

  return (
    <Container>
      <UsernameInputContainer>
        <Logo src="/../assets/viscadialogo.png" alt="Viscadia Logo" />
        <ThemeBorder>
          <WhiteRec />
          <RedRec />
        </ThemeBorder>
      </UsernameInputContainer>
      <Heading>Viscadia Forecasting Solution</Heading>
      <LoginContainer>
        <InputContainer>
          <InputContainerInput
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            autoComplete="email"
          />
          <InputContainerInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoComplete="current-password"
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputContainer>
        <ButtonfButton onClick={handleProceedClick}>Log In</ButtonfButton>
        <RememberForgotContainer>
          <label>
            <input type="checkbox" />
            <RememberMeLabel>Remember me</RememberMeLabel>
          </label>
          <ForgotPasswordLink href="#">Forgot Your Password?</ForgotPasswordLink>
        </RememberForgotContainer>
        <ContactUsLink onClick={() => setPageValue("ContactUs")}>Contact Us</ContactUsLink>
      </LoginContainer>
      <Footer>© 2024 Viscadia. All rights reserved.</Footer>
    </Container>
  );
};

export default UserLogin;
