import React from "react";
import {
  Layout,
  TopRightSection,
  TopRightText,
  MainContent,
  SidebarContainer,
  ContentContainer,
  LogoContainer,
  TextContainer,
  ProfileImage,
} from "./mainLayoutNew";
import Sidebartest2 from "../Side Bar/sidebartest2";

const MainLayout = ({ children, onMenuItemClick, handleLogout, activePage }) => {
  return (
    <Layout>
      <TopRightSection>
        <LogoContainer>
          <ProfileImage src="/../assets/Viscadia_Logo_white.png" alt="Profile" />
        </LogoContainer>
        <TextContainer>
          <TopRightText>Viscadia Forecast Solution</TopRightText>
        </TextContainer>
      </TopRightSection>
      <MainContent>
        <SidebarContainer>
          <Sidebartest2
            onMenuItemClick={onMenuItemClick}
            handleLogout={handleLogout}
            activePage={activePage} // Pass the activePage prop to Sidebartest2
          />
        </SidebarContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContent>
    </Layout>
  );
};

export default MainLayout;
