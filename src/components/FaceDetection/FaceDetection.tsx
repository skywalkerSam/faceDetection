import "./FaceDetection.css";

interface Props {
  imageUrl: string;
  box: object;
}

const FaceDetection: React.FC<Props> = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          src={imageUrl}
          alt="Not Found!"
          width={600}
          height={"auto"}
        />
        <div
          className="bounding-box"
          style={{
            top: box?.topRow,
            right: box?.rightCol,
            bottom: box?.bottomRow,
            left: box?.leftCol,
          }}
        ></div>
      </div>
    </div>
  );
};
export default FaceDetection;
