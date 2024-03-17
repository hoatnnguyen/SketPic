import { FC } from 'react';
import "./app.scss";

interface AppProps {
  title: string;
}

const App: FC<AppProps> = () => {
  return <h1>App</h1>;
};

export default App;
