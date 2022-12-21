import { FormInstance } from "antd";
import { useAppDispatch } from "bll/hooks/useAppDispatch";
import { setEditableTask, setIsEditable } from "bll/slices/editable-task";
import { setNotice } from "bll/slices/notifications";
import { editTask } from "bll/slices/tasks";
import { DATE_FORMAT, TIME_FORMAT } from "shared/lib/constants/formats";
import { ITask } from "shared/lib/interfaces/ITask/interface";
import { ITaskForm } from "shared/lib/interfaces/ITaskForm/interface";
import { getReminderTime } from "shared/lib/utils/getReminderTime";

export const useFinishEditTask = (task: ITask, form: FormInstance<any>) => {
  const dispatch = useAppDispatch();

  const onFinish = (values: ITaskForm) => {
    const newTask: ITask = {
      id: task.id,
      title: values.title,
      date: values.date.format(DATE_FORMAT),
      startTask: values.range[0].format(TIME_FORMAT),
      endTask: values.range[1].format(TIME_FORMAT),
      reminderTime: getReminderTime(values),
    };

    dispatch(editTask(newTask));
    dispatch(setNotice(newTask));
    dispatch(setEditableTask(""));
    form.resetFields();
    dispatch(setIsEditable(true));
  };

  return onFinish;
};
