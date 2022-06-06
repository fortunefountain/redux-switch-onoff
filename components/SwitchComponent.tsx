import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  appDispatch,
  initialize,
  loadFromLocalStorage,
  switchOffAction,
  switchOnAction,
  SwitchState,
} from "../app/store";

const SwitchComponent: FC<{}> = () => {
  const isOn = useSelector((state: SwitchState) => {
    return state.isOn;
  });
  useEffect(() => {
    appDispatch(initialize(loadFromLocalStorage().isOn));
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          console.log("clicked");
          appDispatch(switchOnAction);
        }}
      >
        on
      </button>
      <button onClick={() => appDispatch(switchOffAction)}>off</button>
      <span>{isOn ? "on" : "off"}</span>
    </div>
  );
};

export default SwitchComponent;
