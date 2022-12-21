import { Button, Calendar, Space } from "antd";
import { useAppSelector } from "bll/hooks/useAppSelector";
import { Dayjs } from "dayjs";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useDataCell } from "./model";

import s from "./styles.module.css";

export const CalendarComponent: FC = () => {
  const tasks = useAppSelector((store) => store.tasks);
  const dataCell = useDataCell(tasks, s.tasks);

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
      <Calendar
        onSelect={(date: Dayjs) => console.log(date)}
        dateCellRender={dataCell}
        className={s.calendar}
      />
      ;
    </>
  );
};
