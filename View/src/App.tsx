import { FC } from 'react';
import "./app.scss";
import Hero from './components/Hero';

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
