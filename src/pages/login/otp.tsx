import { Button, PinInput } from "@mantine/core";
import { useForm, zodResolver } from "@mantine/form";
import { z } from "zod";
import ApiClient from "../../network/api";
import ShowNotification from "../../components/notification";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function VerifyOtp() {
  const [loading, setLoading] = useState(false);
  const navigateLink = useNavigate();

  const schema = z.object({
    otp: z.string().min(1),
  });
  const form = useForm({
    initialValues: {
      otp: "",
    },
    validate: zodResolver(schema),
  });

  const onSubmit = async (value: typeof form.values) => {
    setLoading(true);
    try {
      const data = {
        email: localStorage.getItem("email"),
        otp: value.otp,
      };
      const response = await ApiClient.post("/auth/verify", data);
      const status =
        response.status == 200 || response.status == 201 ? true : false;
      if (status) {
        localStorage.setItem("id", response.data.data.id);
        localStorage.setItem("name", response.data.data.name);
        localStorage.setItem("email", response.data.data.email);
        localStorage.setItem("mobile", response.data.data.mobile);
        localStorage.setItem("roleId", response.data.data.roleId);
        localStorage.setItem("token", response.data.data.webToken);
        localStorage.setItem("isActive", response.data.data.isActive);
        setLoading(false);
        form.reset();
        navigateLink("/Home");
        ShowNotification(response.status, response.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const meassage =
          error.response?.data.message ?? "Some thing went wrong";
        setLoading(false);

        ShowNotification(status, meassage);
      } else {
        setLoading(false);
        ShowNotification(0, "Unexpected error occurs");
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <div className="w-full min-h-screen flex items-center justify-center  bg-gradient-to-t from-ice-cold via-medium-purple to-purple-pain ">
        <div className="flex w-full border-2 flex-col space-y-5 p-5 bg-white shadow-inner rounded-xl border-cyan-800 max-sm:p-1 sm:w-full sm:max-w-xl ">
          <div className="relative flex justify-center">
            <span className="text-1xl font-bold sm:text-3xl">Verfiy otp</span>
          </div>
          <div className="root sm:p-6 flex justify-center">
            <PinInput
              {...form.getInputProps("otp")}
              type={/^[0-9]*$/}
              length={6}
              placeholder=""
              size="sm"
              className="pinInput"
            />
          </div>
          <div className="flex justify-center p-3">
            <Button
              loading={loading}
              variant="filled"
              className="bg-blue-900 hover:bg-gradient-to-t hover:from-blue-600 hover:to-blue-300 hover:text-black"
              type="submit"
              size="sm"
              fullWidth
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
export default VerifyOtp;
