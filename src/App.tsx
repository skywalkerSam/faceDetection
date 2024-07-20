// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import "tachyons";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import starboyLogo from "/logo.png";

interface apiResponse {
  image: object;
  imageWidth: number;
  imageHeight: number;
}

const calculateFaceLocation = (data?: apiResponse) => {
  // console.log('Clarifai Model Response:', data);
  const clarifaiFaceDetect = data.data.regions[0].region_info.bounding_box;
  const image = document.getElementById("inputimage");
  const imageWidth = image?.width
  const imageHeight = image?.height
  // console.log(clarifaiFaceDetect, imageWidth, imageHeight)
  return {
    topRow: clarifaiFaceDetect.top_row * imageHeight,
    leftCol: clarifaiFaceDetect.left_col * imageWidth,
    rightCol: imageWidth - clarifaiFaceDetect.right_col * imageWidth,
    bottomRow: imageHeight - clarifaiFaceDetect.bottom_row * imageHeight,
  };
};

const App = () => {
  return (
    <>
      <ErrorBoundary>
        <div>
          <a
            href="https://github.com/skywalkersam"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={starboyLogo} alt="Starboy Logo" className="starboyLogo" />
          </a>
        </div>
        <footer className="white-80 mt6">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={appLogo} className="logo" alt="animalFarm logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <small>&copy; Copyright 2024, Starboy Inc.</small>
        </footer>
        <PWABadge></PWABadge>
      </ErrorBoundary>
    </>
  );
};

export default App;
