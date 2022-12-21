import compose from "compose-function";
import { withPersistor } from "./with-persistor";
import { withRouter } from "./with-router";
import { withStore } from "./with-store";

export const withProviders = compose(withRouter, withStore, withPersistor);
