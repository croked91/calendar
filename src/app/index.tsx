import { NewTask } from "components/new-task";
import { CalendarComponent } from "components/calendar";
import { TaskList } from "components/task-list";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CalendarComponent />}></Route>
        <Route path="/task-list" element={<TaskList />}></Route>
        <Route path="/new-task" element={<NewTask />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
