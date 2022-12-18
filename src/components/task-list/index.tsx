import { Button, List, Space } from "antd";
import { useAppSelector } from "bll/hooks/useAppSelector";
import { Link } from "react-router-dom";

export const TaskList = () => {
  const tasks = useAppSelector((s) => s.tasks);

  return (
    <Space direction="vertical">
      <Link to="/new-task">
        <Button type="primary">+ Добавить задачу</Button>
      </Link>
      <List style={{ width: "100vw" }}>
        {tasks.map((task) => (
          <List.Item
            key={task.id}
            actions={[<a>Удалить</a>, <a>Редактировать</a>]}
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
