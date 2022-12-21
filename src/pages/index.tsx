import { CalendarComponent } from "features/calendar";
import { NewTask } from "features/new-task";
import { TaskList } from "features/task-list";
import { Route, Routes } from "react-router";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarComponent />}></Route>
      <Route path="/task-list" element={<TaskList />}></Route>
      <Route path="/new-task" element={<NewTask />}></Route>
    </Routes>
  );
};
