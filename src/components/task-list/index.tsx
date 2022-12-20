import { Button, Drawer, List, notification, Space } from "antd";
import { useAppDispatch } from "bll/hooks/useAppDispatch";
import { useAppSelector } from "bll/hooks/useAppSelector";
import { setEditableTask, setIsEditable } from "bll/slices/editable-task";
import { deleteTask } from "bll/slices/tasks";
import { EditTask } from "components/edit-task";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const TaskList = () => {
  const tasks = useAppSelector((s) => s.tasks);
  const dispatch = useAppDispatch();
  const editableTask = useAppSelector((s) => s.editableTask);

  const deleteHandler = (id: string) => {
    dispatch(deleteTask(id));
    openNotification("warning", "Задача удалена");
  };

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: "success" | "warning",
    description: string
  ) => {
    api[type]({
      message: "Успешно",
      description,
    });
  };

  useEffect(() => {
    editableTask.isEdited &&
      openNotification("success", "Задача отредакатирована");
    dispatch(setIsEditable(false));
  }, [editableTask.isEdited]);

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
      <Link to="/new-task">
        <Button type="primary">+ Добавить задачу</Button>
      </Link>
      <List style={{ width: "100vw" }}>
        {tasks.map((task) => (
          <List.Item
            key={task.id}
            actions={[
              <Button onClick={() => deleteHandler(task.id)}>Удалить</Button>,
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
