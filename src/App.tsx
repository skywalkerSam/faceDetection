import React from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import "tachyons";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import starboyLogo from "/logo.png";
import useDetectFace from "./hooks/useDetectFace.ts";

const App: React.FC = () => {
  const { imageUrl, setImageUrl, faceBox, detect } = useDetectFace();

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

        {/* ImageBox */}
        <div>
          <p className="f4 white-80 mt5">
            {"Here you can detect a face in Images, Give it a go..."}
          </p>
          <div className="center">
            <div className="center form pa4 br3 shadow-5">
              <input
                className="urlBox w-100 bg-transparent pa2 br4 ba grow mt3 mb3"
                type="text"
                placeholder="Image URL"
                onChange={(event) => {
                  setImageUrl(event.target.value);
                  // console.log(imageUrl);
                }}
              ></input>
              <button
                className="buttonSubmit w-30 bg-transparent pa2 br4 ba grow mt3 mb3"
                onClick={detect}
              >
                Detect Face!
              </button>
              <br />
            </div>
          </div>
        </div>

        {/* FaceDetection */}
        <div className="center ma">
          <div className="absolute mt2">
            <img
              className="image-container"
              id="inputImage"
              src={imageUrl}
              // alt="Provide Image URL!"
            />
            <div
              className="bounding-box"
              style={{
                top: faceBox?.topRow,
                right: faceBox?.rightCol,
                bottom: faceBox?.bottomRow,
                left: faceBox?.leftCol,
              }}
            ></div>
          </div>
        </div>
        <div>
          <footer className="white-80 mt6 ml6">
            <small>&copy; Copyright 12024, Starboy Inc.</small>
            <div>
              <a href="https://vitejs.dev" target="_blank">
                <img src={appLogo} className="logo" alt="animalFarm logo" />
              </a>
              <a href="https://react.dev" target="_blank">
                <img src={reactLogo} className="logo react" alt="React logo" />
              </a>
            </div>
          </footer>
        </div>
        <PWABadge></PWABadge>
      </ErrorBoundary>
    </>
  );
};

export default App;
