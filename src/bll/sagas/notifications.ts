import { ITask } from "bll/slices/tasks/interface";
import { take, takeEvery } from "redux-saga/effects";

type TriggerPayload = {
  type: string;
  payload: ITask;
};

function* setNotificationsWork() {
  yield console.log(123321);
  const action: TriggerPayload = yield take("notifications/setNotice");
  console.log(action);
}

export function* setNotificationsWatch() {
  yield takeEvery("notifications/setNotice", setNotificationsWork);
}
