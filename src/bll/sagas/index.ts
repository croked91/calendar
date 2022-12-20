import { all } from "redux-saga/effects";
import { setNotificationsWatch } from "./notifications";

export default function* rootSaga() {
  yield all([setNotificationsWatch()]);
}
