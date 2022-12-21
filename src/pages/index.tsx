import { CalendarComponent } from "components/calendar";
import { NewTask } from "components/new-task";
import { TaskList } from "components/task-list";
import { Routes, Route } from "react-router";

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<CalendarComponent />}></Route>
      <Route path="/task-list" element={<TaskList />}></Route>
      <Route path="/new-task" element={<NewTask />}></Route>
    </Routes>
  );
};
