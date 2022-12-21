import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "bll/store";

export const withPersistor = (component: () => React.ReactNode) => () =>
  <PersistGate persistor={persistor}>{component()}</PersistGate>;
