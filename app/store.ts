import {
  AnyAction,
  configureStore,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";

export type SwitchState = {
  isOn: boolean;
};

type SwitchThunkAction = ThunkAction<void, SwitchState, unknown, AnyAction>;

const initialState: SwitchState = {
  isOn: false,
};

const switchSlice = createSlice({
  name: "Switch",
  initialState,
  reducers: {
    switchOn: (state) => {
      return { ...state, isOn: true };
    },
    switchOff: (state) => {
      return { ...state, isOn: false };
    },
    initialize: (state, action: PayloadAction<boolean>) => {
      return { ...state, isOn: action.payload };
    },
  },
});

export const { switchOn, switchOff, initialize } = switchSlice.actions;

export const switchOnAction: SwitchThunkAction = (dispatch) => {
  dispatch(switchOn());
};

export const switchOffAction: SwitchThunkAction = (dispatch) => {
  dispatch(switchOff());
};

export const saveStateToLocalStorage = (state: SwitchState) => {
  try {
    if (typeof window !== "undefined") {
      const serializedState = JSON.stringify(state);
      localStorage.setItem("isOn", serializedState);
    }
  } catch (e) {
    console.log(e);
  }
};

export const loadFromLocalStorage = () => {
  let localStorageValue = undefined;
  if (typeof window !== "undefined") {
    localStorageValue = localStorage.getItem("isOn");
  }
  if (localStorageValue) {
    return JSON.parse(localStorageValue) as SwitchState;
  }
  return initialState;
};

export const store = configureStore<SwitchState>({
  reducer: switchSlice.reducer,
  devTools: true,
});

store.subscribe(() => {
  saveStateToLocalStorage(store.getState());
});

export const appDispatch = store.dispatch;
