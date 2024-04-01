import { FC } from 'react';
import "./app.scss";
import Hero from './components/Hero';
import "tw-elements-react/dist/css/tw-elements-react.min.css";

interface AppProps {
  title: string;
}

const App: FC<AppProps> = () => {
  return (
  <div className="bg-blue">
    <Hero></Hero>
  </div>
  )
};

export default App;
