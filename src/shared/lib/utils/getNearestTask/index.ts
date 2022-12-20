import dayjs from "dayjs";
import { ITask } from "shared/lib/interfaces/ITask/interface";

export const getNearestTask = (tasks: ITask[], format: string) => {
  return tasks.reduce((p, v) => {
    return dayjs(p.reminderTime, format) <
      dayjs(v.reminderTime, format)
      ? p
      : v;
  });
};
