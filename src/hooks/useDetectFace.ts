import { useState, useDebugValue } from "react";

const serverUrl: string = "https://facedetection-server-dxrj.onrender.com/detect";

interface apiResponse {
  top_row: number;
  left_col: number;
  bottom_row: number;
  right_col: number;
}

// useDetectFace
export default function useDetectFace() {
    const [imageUrl, setImageUrl] = useState("");
    const [faceBox, setFaceBox] = useState<{
      topRow: number;
      rightCol: number;
      bottomRow: number;
      leftCol: number;
    }>({
      topRow: 0,
      rightCol: 0,
      bottomRow: 0,
      leftCol: 0,
    });
  
    const calculateFaceLocation = (response: apiResponse) => {
      // setFaceBox(response);
      const image = document.getElementById("inputImage") as HTMLImageElement;
      const imageHeight = image?.height ?? 0;
      const imageWidth = image?.width ?? 0;
      console.log(imageUrl, faceBox, imageWidth, imageHeight);
      return {
        topRow: response.top_row * imageHeight,
        leftCol: response.left_col * imageWidth,
        rightCol: imageWidth - response.right_col * imageWidth,
        bottomRow: imageHeight - response.bottom_row * imageHeight,
      };
    };
  
    const detect = () => {
      console.log("Image URL: ", imageUrl);
  
      fetch(serverUrl, {
        mode: 'no-cors',
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: imageUrl,
        }),
      })
        .then((response) => response.json())
        .then((box) => setFaceBox(calculateFaceLocation(box)))
        .catch((error) => console.log(error));
  
      console.log("Please wait, processing the image... ");
    };
  
    useDebugValue(imageUrl ?? "Loading...");
  
    return { imageUrl, setImageUrl, faceBox, detect };
  }
  