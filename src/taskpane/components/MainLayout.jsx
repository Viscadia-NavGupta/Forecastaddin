import React from "react";
import {
  Layout,
  TopRightSection,
  TopRightText,
  MainContent,
  Sidebar,
  ContentContainer,
  TopSection,
  ProfileImage,
} from "./mainLayoutNew";
import Sidebartest2 from "./sidebartest2";

const MainLayout = ({ children, onMenuItemClick }) => {
  return (
    <Layout>
      <TopRightSection>
        <TopSection>
          <ProfileImage src="/../assets/Viscadia_V_Logo.png" alt="Profile" />
        </TopSection>
        <TopRightText>Viscadia Forecast Platform</TopRightText>
      </TopRightSection>
      <MainContent>
        <Sidebar>
          <Sidebartest2 onMenuItemClick={onMenuItemClick} />
        </Sidebar>
        <ContentContainer>{children}</ContentContainer>
      </MainContent>
    </Layout>
  );
};

export default MainLayout;
