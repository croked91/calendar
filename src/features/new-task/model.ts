import { FormInstance } from "antd";
import { useAppDispatch } from "bll/hooks/useAppDispatch";
import { setNotice } from "bll/slices/notifications";
import { addNewTask } from "bll/slices/tasks";
import { DATE_FORMAT, TIME_FORMAT } from "shared/lib/constants/formats";
import { IOpenNotification } from "shared/lib/interfaces/IOpenNotification";
import { ITask } from "shared/lib/interfaces/ITask/interface";
import { ITaskForm } from "shared/lib/interfaces/ITaskForm/interface";
import { getReminderTime } from "shared/lib/utils/getReminderTime";

//TODO join with useFinishEditTask to universal hook
export const useFinishNewTask = (
  form: FormInstance<any>,
  openNotification: (args: IOpenNotification) => void
) => {
  const dispatch = useAppDispatch();
  const onFinish = (values: ITaskForm) => {
    const newTask: ITask = {
      id: String(Math.random()),
      title: values.title,
      date: values.date.format(DATE_FORMAT),
      startTask: values.range[0].format(TIME_FORMAT),
      endTask: values.range[1].format(TIME_FORMAT),
      reminderTime: getReminderTime(values),
    };

    dispatch(setNotice(newTask));
    dispatch(addNewTask(newTask));

    form.resetFields();
    openNotification({
      type: "success",
      message: "Успешно",
      description: `Задача ${newTask.title} успешно добавлена`,
    });
  };

  return onFinish;
};
