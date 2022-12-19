import {
  Button,
  DatePicker,
  Form,
  Input,
  notification,
  Select,
  Space,
  TimePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useAppDispatch } from "bll/hooks/useAppDispatch";
import { addNewTask } from "bll/slices/tasks";
import { ITask } from "bll/slices/tasks/interface";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { TIME_FORMAT } from "shared/lib/formats";
import { options } from "./constants";
import { ITaskForm } from "./interface";
import s from "./styles.module.css";

export const NewTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = useForm();
  const onFinish = (values: ITaskForm) => {
    const newTask: ITask = {
      id: String(Math.random()),
      title: values.title,
      date: values.date.format("YYYY-MM-DD"),
      startTask: values.range[0].format("HH:mm"),
      endTask: values.range[1].format("HH:mm"),
      reminderTime: values.reminderTime,
    };

    const reminderT = dayjs(
      dayjs(values.date)
        .format("YYYY:MM:DD")
        .concat(dayjs(values.range[0]).format(" HH:mm")),
      "YYYY:MM:DD HH:mm"
    )
      .add(-`${values.reminderTime}`, "m")
      .valueOf();

    console.log(reminderT - dayjs().valueOf());

    dispatch(addNewTask(newTask));
    form.resetFields();
    openNotification();
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.success({
      message: "Успешно",
      description: "Задача добавлена",
    });
  };

  return (
    <Space className={s.container} size={100} direction="vertical">
      {contextHolder}
      <Link to="/">
        <Button type="primary">В календарь</Button>
      </Link>
      <Form form={form} size="large" name="new-task" onFinish={onFinish}>
        <Form.Item
          name="title"
          rules={[{ required: true, message: "Введите название задачи!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="date"
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
            Добавить
          </Button>
        </Form.Item>
      </Form>
    </Space>
  );
};
