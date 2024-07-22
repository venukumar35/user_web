import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { Outlet } from "react-router-dom";
import { Notifications } from "@mantine/notifications";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

export default function App() {
  return (
    <MantineProvider>
      <Notifications />
      <Outlet />
    </MantineProvider>
  );
}
