import { NewTask } from "components/new-task";
import { CalendarComponent } from "components/calendar";
import { TaskList } from "components/task-list";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppSelector } from "bll/hooks/useAppSelector";
import { notification } from "antd";
import { useEffect } from "react";

export default function App() {
  // const notifications = useAppSelector((s) => s.notifications);
  // console.log(notifications);

  // const [api, contextHolder] = notification.useNotification();

  // const openNotification = (
  //   type: "success" | "warning",
  //   description: string
  // ) => {
  //   api[type]({
  //     message: "Успешно",
  //     description,
  //   });
  // };

  // useEffect(() => {
  //   notifications.length && openNotification("success", "yoyoyoyoyo");
  //   console.log(notifications);
  // }, [notifications]);

  return (
    <BrowserRouter>
      {/* {contextHolder} */}
      <Routes>
        <Route path="/" element={<CalendarComponent />}></Route>
        <Route path="/task-list" element={<TaskList />}></Route>
        <Route path="/new-task" element={<NewTask />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
