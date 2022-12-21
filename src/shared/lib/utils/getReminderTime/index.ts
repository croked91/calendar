import dayjs from "dayjs";
import {
  DATE_FORMAT,
  REMINDER_TIME_FORMAT,
} from "shared/lib/constants/formats";
import { ITaskForm } from "shared/lib/interfaces/ITaskForm/interface";

export const getReminderTime = (values: ITaskForm) => {
  return String(
    dayjs(
      dayjs(values.date)
        .format(DATE_FORMAT)
        .concat(dayjs(values.range[0]).format(" HH:mm")),
      REMINDER_TIME_FORMAT
    )
      .add(-`${values.reminderTime}`, "m")
      .format(REMINDER_TIME_FORMAT)
  );
};
