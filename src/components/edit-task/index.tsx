import { isEditable } from "@testing-library/user-event/dist/utils";
import {
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  TimePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useAppDispatch } from "bll/hooks/useAppDispatch";
import { setEditableTask, setIsEditable } from "bll/slices/editable-task";
import { editTask } from "bll/slices/tasks";
import { setNotice } from "bll/slices/notifications";
import { ITask } from "bll/slices/tasks/interface";
import { options } from "components/new-task/constants";
import { ITaskForm } from "components/new-task/interface";
import dayjs from "dayjs";
import React from "react";
import { TIME_FORMAT } from "shared/lib/formats";
import { IEditTask } from "./interface";

import s from "./styles.module.css";

export const EditTask: React.FC<IEditTask> = ({ task }) => {
  const dispatch = useAppDispatch();
  const [form] = useForm();

  const onFinish = (values: ITaskForm) => {
    const newTask: ITask = {
      id: task.id,
      title: values.title,
      date: values.date.format("YYYY-MM-DD"),
      startTask: values.range[0].format("HH:mm"),
      endTask: values.range[1].format("HH:mm"),
      reminderTime: values.reminderTime,
    };

    dispatch(editTask(newTask));
    dispatch(setNotice(newTask));

    dispatch(setEditableTask(""));
    form.resetFields();
    dispatch(setIsEditable(true));
  };

  return (
    <Space className={s.container} size={100} direction="vertical">
      <Form
        form={form}
        size="large"
        name="new-task"
        onFinish={onFinish}
        initialValues={{
          title: task.title,
          date: dayjs(task.date),
          range: [dayjs(task.startTask, "hh:mm"), dayjs(task.endTask, "hh:mm")],
          reminderTime: task.reminderTime,
        }}
      >
        <Form.Item
          name="title"
          key="title"
          rules={[{ required: true, message: "Введите название задачи!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
          key="date"
          rules={[{ required: true, message: "Выберите дату задачи!" }]}
        >
          <DatePicker
            disabledDate={(date) => date < dayjs().add(-1, "day")}
            placeholder="Выберите дату"
          />
        </Form.Item>

        <Form.Item
          name="range"
          rules={[
            { required: true, message: "Выберите время выполнения задачи!" },
          ]}
        >
          <TimePicker.RangePicker
            placeholder={["Начало", "Конец"]}
            format={TIME_FORMAT}
          />
        </Form.Item>

        <Form.Item name="reminderTime">
          <Select placeholder="За сколько напомнить" options={options} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Сохранить
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};
