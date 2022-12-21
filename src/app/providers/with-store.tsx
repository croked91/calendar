import { Provider } from "react-redux";
import { store } from "bll/store";

export const withStore = (component: () => React.ReactNode) => () =>
  <Provider store={store}>{component()}</Provider>;