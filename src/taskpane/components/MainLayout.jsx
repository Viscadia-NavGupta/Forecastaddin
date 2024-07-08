import React from "react";
import {
  Layout,
  TopRightSection,
  TopRightText,
  MainContent,
  SidebarContainer,
  ContentContainer,
  TopSection,
  ProfileImage,
} from "./mainLayoutNew";
import Sidebartest2 from "./sidebartest2";

const MainLayout = ({ children, onMenuItemClick, handleLogout }) => {
  return (
    <Layout>
      <TopRightSection>
        <TopSection>
          <ProfileImage src="/../assets/Viscadia_V_Logo.png" alt="Profile" />
        </TopSection>
        <TopRightText>Viscadia Forecast Platform</TopRightText>
      </TopRightSection>
      <MainContent>
        <SidebarContainer>
          <Sidebartest2 onMenuItemClick={onMenuItemClick} handleLogout={handleLogout} />
        </SidebarContainer>
        <ContentContainer>{children}</ContentContainer>
      </MainContent>
    </Layout>
  );
};

export default MainLayout;
