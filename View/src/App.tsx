import { FC } from 'react';
import "./app.scss";
import Hero from './Hero';

interface AppProps {
  title: string;
}

const App: FC<AppProps> = () => {
  return <Hero></Hero>;
};

export default App;
