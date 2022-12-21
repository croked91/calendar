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
import { useAppNotification } from "bll/hooks/useAppNotification";
import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";
import { TIME_FORMAT } from "shared/lib/constants/formats";
import { options } from "../../shared/lib/constants/reminder-time-options";
import { useFinishNewTask } from "./model";
import s from "./styles.module.css";

export const NewTask: React.FC = () => {
  const { contextHolder, openNotification } = useAppNotification();
  const [form] = useForm();
  const onFinish = useFinishNewTask(form, openNotification);

  return (
    <Space className={s.container} size={40} direction="vertical">
      {contextHolder}
      <Space direction="horizontal">
        <Link to="/">
          <Button type="primary">Календарь</Button>
        </Link>
        <Link to="/task-list">
          <Button type="primary">Все задачи</Button>
        </Link>
      </Space>
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
            { required: true, message: "Выберите за сколько напомнить!" },
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
