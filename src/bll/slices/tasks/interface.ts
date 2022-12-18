import { Dayjs } from "dayjs";



export interface ITask {
  id: string;
  title: string;
  date: string;
  startTask: string;
  endTask: string;
  reminderTime?: number;
}
