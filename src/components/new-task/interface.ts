import { Dayjs } from "dayjs";
export interface ITaskForm {
  id: string;
  title: string;
  date: Dayjs;
  range: Dayjs[];
  reminderTime: number;
}


