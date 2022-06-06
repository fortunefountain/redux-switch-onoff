import type { NextPage } from "next";
import { Provider } from "react-redux";
import { store } from "../app/store";
import SwitchComponent from "../components/SwitchComponent";

const Home: NextPage = () => {
  return (
    <Provider store={store}>
      <SwitchComponent />
    </Provider>
  );
};

export default Home;
