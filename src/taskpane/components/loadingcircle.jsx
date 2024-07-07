import React from "react";
import {
  Overlay,
  LoadingContainer,
  LoadingCircle,
  LoadingMessage,
} from "./LoadingCirclestyles";

const LoadingCircleComponent = () => {
  return (
    <Overlay>
      <LoadingContainer>
        <LoadingCircle></LoadingCircle>
        <LoadingMessage>Running calculations...</LoadingMessage>
      </LoadingContainer>
    </Overlay>
  );
};

export default LoadingCircleComponent;
