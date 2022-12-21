import { notification } from "antd";
import { IOpenNotification } from "shared/lib/interfaces/IOpenNotification";

export const useAppNotification = () => {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (args: IOpenNotification) => {
    const { type, message, description } = args;
    api[type]({
      message,
      description,
    });
  };

  return { contextHolder, openNotification };
};
