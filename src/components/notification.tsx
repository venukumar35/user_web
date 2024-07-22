import { notifications } from "@mantine/notifications";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ShowNotification = (status: any, message: any) => {
  const title = status == 200 || status == 201 ? "Success" : "failed";
  notifications.show({
    title: title,
    message: message,
    color: status == 200 || status == 201 ? "green" : "red",
  });
};

export default ShowNotification;
