import dayjs from "dayjs";
import { ITask } from "shared/lib/interfaces/ITask/interface";

type GetTimeOutDuration = (
  tasks: ITask[],
  callback: (tasks: ITask[], format: string) => ITask,
  format: string
) => number;

export const getTimeoutDuration: GetTimeOutDuration = (
  tasks,
  callback,
  format
) => {
  return dayjs(callback(tasks, format).reminderTime, format)
    .add(-dayjs())
    .valueOf();
};
