import { FC } from 'react';
import "./hero.scss";
import Sketpic from './Sketpic';
import Upload from './Upload';

const Hero: FC = () => {
  return (
    <div className="hero-container">
      <Sketpic />
      <Upload />
    </div>
  );
}
export default Hero;
