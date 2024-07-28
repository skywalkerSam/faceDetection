import React from "react";
import "./ImageBox.css";

interface Props {
  onInputChange(): void;
  onPictureSubmit(): void;
}

const ImageBox: React.FC<Props> = ({ onInputChange, onPictureSubmit }) => {
  return (
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
            onChange={onInputChange}
          ></input>
          <button
            className="buttonSubmit w-30 bg-transparent pa2 br4 ba grow mt3 mb3"
            onClick={onPictureSubmit}
          >
            {" "}
            Detect Face!
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};
export default ImageBox;
