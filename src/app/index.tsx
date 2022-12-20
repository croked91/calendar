import { notification } from "antd";
import { useAppDispatch } from "bll/hooks/useAppDispatch";
import { useAppSelector } from "bll/hooks/useAppSelector";
import { editTask } from "bll/slices/tasks";
import { CalendarComponent } from "components/calendar";
import { NewTask } from "components/new-task";
import { TaskList } from "components/task-list";
import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { REMINDER_TIME_FORMAT } from "shared/lib/formats";
import { getNearestTask } from "shared/lib/utils/getNearestTask";
import { getTimeoutDuration } from "shared/lib/utils/getTimeoutDuration";

export default function App() {
  const tasks = useAppSelector((s) => s.tasks);
  const dispatch = useAppDispatch();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: "success" | "warning" | "info",
    message: "Успешно" | "Внимание",
    description: string
  ) => {
    api[type]({
      message,
      description,
    });
  };

  useEffect(() => {
    if (tasks.length) {
      const task = getNearestTask(tasks, REMINDER_TIME_FORMAT);
      task.reminderTime &&
        setTimeout(() => {
          openNotification(
            "success",
            "Внимание",
            `Задача ${task.title} начнется в ${task.startTask}`
          );
          dispatch(editTask({ ...task, reminderTime: null }));
        }, getTimeoutDuration(tasks, getNearestTask, REMINDER_TIME_FORMAT));
    }
  }, [tasks]);

  return (
    <BrowserRouter>
      {contextHolder}
      <Routes>
        <Route path="/" element={<CalendarComponent />}></Route>
        <Route path="/task-list" element={<TaskList />}></Route>
        <Route path="/new-task" element={<NewTask />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
