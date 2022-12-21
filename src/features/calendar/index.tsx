import { Button, Calendar, Drawer, Space } from "antd";
import { useAppSelector } from "bll/hooks/useAppSelector";
import { Dayjs } from "dayjs";
import { TaskList } from "features/task-list";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { useDataCell } from "./model";

import s from "./styles.module.css";

export const CalendarComponent: FC = () => {
  const tasks = useAppSelector((store) => store.tasks);
  const dataCell = useDataCell(tasks, s.tasks);
  const [isDayTasksOpen, setIsDayTasksOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState<Dayjs>();

  const onSelectHandler = (date: Dayjs) => {
    setIsDayTasksOpen(true);
    setCurrentDate(date);
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
      <Calendar
        onSelect={(date: Dayjs) => onSelectHandler(date)}
        dateCellRender={dataCell}
        className={s.calendar}
      />
      <Drawer
        width={"100%"}
        onClose={() => setIsDayTasksOpen(false)}
        open={isDayTasksOpen}
      >
        <TaskList currentDate={currentDate} />
      </Drawer>
    </>
  );
};
