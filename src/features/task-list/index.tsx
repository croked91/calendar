import { Button, Drawer, List, Space } from "antd";
import { useAppDispatch } from "bll/hooks/useAppDispatch";
import { useAppNotification } from "bll/hooks/useAppNotification";
import { useAppSelector } from "bll/hooks/useAppSelector";
import { setEditableTask, setIsEditable } from "bll/slices/editable-task";
import { deleteTask } from "bll/slices/tasks";
import { EditTask } from "features/edit-task";
import { FC, useEffect } from "react";
import { Link } from "react-router-dom";
import { DATE_FORMAT } from "shared/lib/constants/formats";
import { ITaskList } from "./interface";

export const TaskList: FC<ITaskList> = ({ currentDate }) => {
  const tasks = useAppSelector((s) => s.tasks);
  const editableTask = useAppSelector((s) => s.editableTask);
  const { contextHolder, openNotification } = useAppNotification();
  const dispatch = useAppDispatch();

  console.log(tasks[0].date);

  useEffect(() => {
    editableTask.isEdited &&
      openNotification({
        type: "success",
        message: "Успешно",
        description: "Задача отредактированна",
      });
    dispatch(setIsEditable(false));
  }, [editableTask.isEdited]);

  const deleteHandler = (id: string, title: string) => {
    dispatch(deleteTask(id));
    openNotification({
      type: "warning",
      message: "Успех",
      description: `Задача ${title} удалена`,
    });
  };

  const editHandler = (id: string) => {
    dispatch(setEditableTask(id));
  };

  return (
    <Space direction="vertical">
      {contextHolder}
      <Drawer
        open={editableTask.id !== ""}
        width={500}
        onClose={() => dispatch(setEditableTask(""))}
      >
        {editableTask.id && (
          <EditTask
            task={tasks.filter((task) => task.id === editableTask.id)[0]}
          />
        )}
      </Drawer>
      <Space direction="horizontal">
        <Link to="/">
          <Button type="primary">Календарь</Button>
        </Link>
        <Link to="/new-task">
          <Button type="primary">+ Добавить задачу</Button>
        </Link>
      </Space>
      <List style={{ width: "100vw" }}>
        {currentDate
          ? tasks
              .filter((task) => task.date === currentDate.format(DATE_FORMAT))
              .map((task) => (
                <List.Item
                  key={task.id}
                  actions={[
                    <Button onClick={() => deleteHandler(task.id, task.title)}>
                      Удалить
                    </Button>,
                    <Button onClick={() => editHandler(task.id)}>
                      Редактировать
                    </Button>,
                  ]}
                >
                  <List.Item.Meta
                    title={task.title}
                    description={`с ${task.startTask} до ${task.endTask}`}
                  />
                </List.Item>
              ))
          : tasks.map((task) => (
              <List.Item
                key={task.id}
                actions={[
                  <Button onClick={() => deleteHandler(task.id, task.title)}>
                    Удалить
                  </Button>,
                  <Button onClick={() => editHandler(task.id)}>
                    Редактировать
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={task.title}
                  description={`с ${task.startTask} до ${task.endTask}`}
                />
              </List.Item>
            ))}
      </List>
    </Space>
  );
};
