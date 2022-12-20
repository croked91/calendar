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
import { setNotice } from "bll/slices/notifications";
import { addNewTask } from "bll/slices/tasks";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import {
  DATE_FORMAT,
  REMINDER_TIME_FORMAT,
  TIME_FORMAT,
} from "shared/lib/formats";
import { ITask } from "shared/lib/interfaces/ITask/interface";
import { options } from "./constants";
import { ITaskForm } from "./interface";
import s from "./styles.module.css";

export const NewTask: React.FC = () => {
  const dispatch = useAppDispatch();
  const [form] = useForm();

  const onFinish = (values: ITaskForm) => {
    const reminderT = String(
      dayjs(
        dayjs(values.date)
          .format(DATE_FORMAT)
          .concat(dayjs(values.range[0]).format(" HH:mm")),
        REMINDER_TIME_FORMAT
      )
        .add(-`${values.reminderTime}`, "m")
        .format(REMINDER_TIME_FORMAT)
    );


    
    const newTask: ITask = {
      id: String(Math.random()),
      title: values.title,
      date: values.date.format(DATE_FORMAT),
      startTask: values.range[0].format(TIME_FORMAT),
      endTask: values.range[1].format(TIME_FORMAT),
      reminderTime: reminderT,
    };
    dispatch(setNotice(newTask));
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

        <Form.Item
          name="reminderTime"
          rules={[
            { required: true, message: "Выберите время выполнения задачи!" },
          ]}
        >
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
