// import { useState } from "react";
import reactLogo from "./assets/react.svg";
import appLogo from "/favicon.svg";
import PWABadge from "./PWABadge.tsx";
import "./App.css";
import "tachyons";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import starboyLogo from "/logo.png";
import ImageBox from "./components/ImageBox/ImageBox.tsx";
import { useState } from "react";

interface apiResponse {
  image: object;
  imageWidth: number;
  imageHeight: number;
}

const App = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [facebox, setFaceBox] = useState({})

  const calculateFaceLocation = (data?: apiResponse) => {
    // console.log('Clarifai Model Response:', data);
    const clarifaiFaceDetect = data.data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const imageWidth = image?.width;
    const imageHeight = image?.height;
    // console.log(clarifaiFaceDetect, imageWidth, imageHeight)
    return {
      topRow: clarifaiFaceDetect.top_row * imageHeight,
      leftCol: clarifaiFaceDetect.left_col * imageWidth,
      rightCol: imageWidth - clarifaiFaceDetect.right_col * imageWidth,
      bottomRow: imageHeight - clarifaiFaceDetect.bottom_row * imageHeight,
    };
  };

  const displayFaceBox = (data: object) => {
    setFaceBox(data)
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target?.value)
    console.log("Image URL: ", imageUrl);
  };

  const onPictureSubmit = () => {
    setImageUrl(event.target.value)

    fetch("https://face-detection-backend-one.onrender.com/imageurl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: imageUrl
      }),
    })
      .then((response) => response.json())
      .then((result) => this.displayFaceBox(calculateFaceLocation(result)))
      .catch((err) => console.log(err));

    console.log("Fetching the Image... ");

    fetch("https://face-detection-backend-one.onrender.com/image", {
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.user.id,
      }),
    })
      .then((response) => response.json())
      .then((count) => {
        // Object.assign doesn't creates a new object, it references to the original object!
        this.setState(Object.assign(this.state.user, { entries: count }));
      })
      .catch((err) => console.log(err));
  };
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

        <ImageBox></ImageBox>
        <footer className="white-80 mt6">
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={appLogo} className="logo" alt="animalFarm logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <small>&copy; Copyright 12024, Starboy Inc.</small>
        </footer>
        <PWABadge></PWABadge>
      </ErrorBoundary>
    </>
  );
};

export default App;
