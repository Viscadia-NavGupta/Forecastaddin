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
} from "./UserLoginStyles";
import * as AWSConnections from "../AWS Midleware/AWSConnections";

const UserLogin = ({ handleLogin, setPageValue }) => {
  const [username, setUsername] = useState("");
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
      <Heading>Viscadia Forecasting Platform</Heading>
      <UserProfileButton>
        <UserProfileButtonInner>User Profile Information</UserProfileButtonInner>
      </UserProfileButton>
      <Rec>
        <InputContainer>
          <InputContainerInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your Username"
          />
          <HelperTextContainer>
            <InputHelperText>Display username in Excel*</InputHelperText>
            <ContactUsButton onClick={() => setPageValue("ContactUs")}>Contact Us</ContactUsButton>
          </HelperTextContainer>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </InputContainer>
        <div>
          <ButtonfButton onClick={handleProceedClick}>Proceed →</ButtonfButton>
        </div>
      </Rec>
      <Footer>© 2024 Viscadia. All rights reserved.</Footer>
    </Container>
  );
};

export default UserLogin;
