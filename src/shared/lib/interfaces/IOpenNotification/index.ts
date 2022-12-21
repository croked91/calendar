export interface IOpenNotification {
  type: "success" | "info" | "warning" | "error";
  message: string;
  description: string;
}
