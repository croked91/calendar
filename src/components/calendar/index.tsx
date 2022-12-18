import { Button, Calendar, Space } from "antd";
import { useAppSelector } from "bll/hooks/useAppSelector";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import s from "./styles.module.css";

export const CalendarComponent: FC = () => {
  const tasks = useAppSelector((s) => s.tasks);

  const dataCell = (date: Dayjs) => {
    return tasks.map((task) => {
      if (dayjs(task.date).format("YYYY-MM-DD") === date.format("YYYY-MM-DD")) {
        return (
          <ul className={s.tasks} key={task.id}>
            {<li>{task.title}</li>}
          </ul>
        );
      }
    });
  };

  return (
    <>
      <Space direction="horizontal" className={s.buttons}>
        <Link to="/task-list">
          <Button type="primary">Все задачи</Button>
        </Link>
        <Link to="/new-task">
          <Button type="primary">+ Добавить задачу</Button>
        </Link>
      </Space>
      <Calendar dateCellRender={dataCell} className={s.calendar} />;
    </>
  );
};
