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
import dayjs from "dayjs";
import React from "react";
import { DATE_FORMAT, TIME_FORMAT } from "shared/lib/constants/formats";
import { options } from "shared/lib/constants/reminder-time-options";
import { IEditTask } from "./interface";
import { useFinishEditTask } from "./model";

import s from "./styles.module.css";

export const EditTask: React.FC<IEditTask> = ({ task }) => {
  const [form] = useForm();
  const onFinish = useFinishEditTask(task, form);

  return (
    <Space className={s.container} size={100} direction="vertical">
      <Form
        form={form}
        size="large"
        name="new-task"
        onFinish={onFinish}
        initialValues={{
          title: task.title,
          date: dayjs(task.date, DATE_FORMAT),
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

        <Form.Item
          name="reminderTime"
          rules={[{ required: true, message: "Выберите время напоминания!" }]}
        >
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
