import { useAppDispatch } from "bll/hooks/useAppDispatch";
import { useAppNotification } from "bll/hooks/useAppNotification";

import { useAppSelector } from "bll/hooks/useAppSelector";
import { editTask } from "bll/slices/tasks";
import { Routing } from "pages";
import { useEffect, useRef } from "react";
import { REMINDER_TIME_FORMAT } from "shared/lib/formats";
import { getNearestTask } from "shared/lib/utils/getNearestTask";
import { getTimeoutDuration } from "shared/lib/utils/getTimeoutDuration";
import { withProviders } from "./providers";

const App = () => {
  const { contextHolder, openNotification } = useAppNotification();
  const tasks = useAppSelector((s) => s.tasks);
  const dispatch = useAppDispatch();
  const timeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (tasks.length) {
      const task = getNearestTask(tasks, REMINDER_TIME_FORMAT);
      if (task.reminderTime) {
        timeout.current = setTimeout(() => {
          openNotification({
            type: "success",
            message: "Внимание",
            description: `Задача ${task.title} начнется в ${task.startTask}`,
          });
          dispatch(editTask({ ...task, reminderTime: null }));
        }, getTimeoutDuration(tasks, getNearestTask, REMINDER_TIME_FORMAT));
      }
    }
    return () => clearTimeout(timeout.current);
  }, [tasks]);

  return (
    <>
      {contextHolder}
      <Routing />
    </>
  );
};

export default withProviders(App);
