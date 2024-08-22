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
  Footer,
  LoginContainer,
  RememberForgotContainer,
  RememberMeLabel,
  ForgotPasswordLink,
  ContactUsLink,
  ButtonfButton,
} from "./UserLoginStyles";
import * as AWSConnections from "../AWS Midleware/AWSConnections";

const UserLogin = ({ handleLogin, setPageValue }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function unhideActivateSheetAndSelectA1() {
    Excel.run(async (context) => {
      const workbook = context.workbook;
      const sheetName = "Landing Page";

      const sheet = workbook.worksheets.getItemOrNullObject(sheetName);
      sheet.load("name, visibility");

      await context.sync();

      if (!sheet.isNullObject) {
        if (sheet.visibility === Excel.SheetVisibility.hidden) {
          sheet.visibility = Excel.SheetVisibility.visible;
        }

        sheet.activate();

        const range = sheet.getRange("A1");
        range.select();
      } else {
        console.log(`Sheet "${sheetName}" does not exist.`);
      }

      await context.sync();
    }).catch((error) => {
      console.error(`Error: ${error}`);
    });
  }

  const handleProceedClick = async () => {
    if (!username.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    const result = await AWSConnections.getCognitoAccessToken(username, "overarching");

    if (result.success) {
      setErrorMessage("");
      sessionStorage.setItem("username", username);
      handleLogin();
      unhideActivateSheetAndSelectA1();
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleProceedClick();
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
      <Heading>Forecast Solution</Heading>
      <LoginContainer>
        <InputContainer>
          <InputContainerInput
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Username"
            autoComplete="email"
          />
          <InputContainerInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
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
