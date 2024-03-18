import { FC } from 'react';
import "./sketpic.scss";

const Sketpic: FC = () => {
  return (
    <div className="container">
      {/* <img src="../public/Logo.png"></img> */}
      <div className="content">
        <div className="logoContainer">
          <div className="logo">
            <div className="halfCircle left"></div>
            <div className="halfCircle right"></div>
          </div>
          <h1 className="ketpic">KETPIC</h1>
        </div>
        <p>Unlock Creativity with Effortless Image Transformation. Convert Your Images to different Styles Instantly. Simply drag & drop a file in the window on the right.</p>
      </div>
    </div>
  );
};

export default Sketpic;
