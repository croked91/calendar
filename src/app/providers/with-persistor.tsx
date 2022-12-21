import { persistor } from "bll/store";
import { PersistGate } from "redux-persist/integration/react";

export const withPersistor = (component: () => React.ReactNode) => () =>
  <PersistGate persistor={persistor}>{component()}</PersistGate>;
