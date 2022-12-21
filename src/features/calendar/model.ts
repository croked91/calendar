import dayjs, { Dayjs } from "dayjs";
import { createElement } from "react";
import { DATE_FORMAT } from "shared/lib/constants/formats";
import { ITask } from "shared/lib/interfaces/ITask/interface";

//TODO make it more universality
export const useDataCell = (tasks: ITask[], className?: string) => {
  const dataCell = (date: Dayjs) => {
    return tasks.map((task) => {
      if (
        dayjs(task.date, DATE_FORMAT).format(DATE_FORMAT) ===
        date.format(DATE_FORMAT)
      ) {
        return createElement("div", { className }, `${task.title}`);
      }
    });
  };

  return dataCell;
};
