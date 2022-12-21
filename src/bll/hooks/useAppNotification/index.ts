import { notification } from "antd";

type OpenNotification = {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description: string;
};

export const useAppNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (args: OpenNotification) => {
    const { type, message, description } = args;
    api[type]({
      message,
      description,
    });
  };

  return { contextHolder, openNotification };
};
