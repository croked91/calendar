import { Button, Calendar, Space } from "antd";
import { useAppSelector } from "bll/hooks/useAppSelector";
import dayjs, { Dayjs } from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import { DATE_FORMAT } from "shared/lib/formats";
import s from "./styles.module.css";

export const CalendarComponent: FC = () => {
  const tasks = useAppSelector((s) => s.tasks);

  const dataCell = (date: Dayjs) => {
    return tasks.map((task) => {
      if (
        dayjs(task.date, DATE_FORMAT).format(DATE_FORMAT) ===
        date.format(DATE_FORMAT)
      ) {
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
