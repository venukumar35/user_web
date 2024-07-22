/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal, Select, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { zodResolver } from "mantine-form-zod-resolver";
import { z } from "zod";
import { Button } from "@mantine/core";
import ShowNotification from "../../components/notification";
import ApiClient from "../../network/api";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { userRegister } from "./userRegisterStore";

function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [open, setOpen] = useState(false);

  const [stateId, setStateId] = useState("");

  const [loading, setLoading] = useState(false);

  const { countryData, allCountry, allState, stateData, registerUser } =
    userRegister();

  useEffect(() => {
    if (open) {
      allCountry();
    }

    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [open]);

  const schema = z.object({
    email: z.string().email({ message: "invalid email" }),
    name: z
      .string()
      .max(30, { message: "Name be 30 or fewer characters long" })
      .min(2, { message: "Name be greater than of two character" }),
    mobile: z
      .string()
      .regex(/^(?=.{7,15}$).*/, { message: "Invalid mobile number" })
      .refine((value) => value.length > 1, { message: "Enter mobile number" }),
    country: z.string().min(1, { message: "Select country" }),
    state: z.string().min(1, { message: "Select state" }),
    doorNumber: z.string().min(2, { message: "Enter the door number" }),
    streetName: z.string().min(2, { message: "Enter the street name" }),
    pinCode: z.string().min(2, { message: "Enter the pincode" }),
  });

  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      mobile: "",
      country: "",
      state: "",
      doorNumber: "",
      streetName: "",
      pinCode: "",
    },
    validate: zodResolver(schema),
  });
  const loginSchema = z.object({
    email: z
      .string()
      .email({ message: "invalid email" })
      .refine((value) => value.length > 1, {
        message: "Enter email address",
      }),
  });
  const loginForm = useForm({
    initialValues: {
      email: "",
    },
    validate: zodResolver(loginSchema),
  });
  const onSubmit = async (value: typeof loginForm.values) => {
    setLoader(true);
    try {
      const data = {
        email: value.email,
      };
      const response = await ApiClient.post("/auth", data);
      const status = response?.status ?? 0;

      if (status == 200 || status == 201) {
        form.reset();
        setLoader(false);

        localStorage.setItem("email", value.email);

        ShowNotification(status, response.data.message);
        navigate("/verifyOtp");
      } else {
        ShowNotification(status, response.data.message ?? "Login failed");
      }
    } catch (error: Error | unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status ?? 0;
        const message = error.response?.data?.message || "An error occurred";

        ShowNotification(status, message);
      } else {
        ShowNotification(0, "An unexpected error occurred");
      }
    }
    setLoader(false);
  };

  const userRegistorys = async (value: typeof form.values) => {
    setLoading(true);
    const data = {
      email: value.email,
      name: value.name,
      mobile: value.mobile,
      doorNumber: value.doorNumber,
      street: value.streetName,
      pincode: value.pinCode,
      stateId: Number(stateId),
    };

    const result = await registerUser(data);

    if (result) {
      setLoading(false);
      setOpen(false);
      form.reset();
    } else {
      setLoading(false);
    }
  };
  // Calculate the size based on the screen width
  let size;
  if (screenWidth < 600) {
    size = "xs";
  } else if (screenWidth < 900) {
    size = "md";
  } else {
    size = "xl";
  }

  function changeCountry(val: string) {
    form.setFieldValue("country", val);
    allState(val);
  }
  function getStateId(val: string) {
    form.setFieldValue("state", val);
    setStateId(val);
  }
  return (
    <div>
      {open ? (
        <div>
          <Modal
            opened={open}
            onClose={() => {
              setOpen(false);
            }}
            withCloseButton={true}
            size={size}
          >
            <form onSubmit={form.onSubmit(userRegistorys)}>
              <div className="space-y-3">
                <TextInput
                  label="Name"
                  placeholder="Enter your name"
                  {...form.getInputProps("name")}
                />
                <TextInput
                  label="Email"
                  placeholder="Enter your email"
                  {...form.getInputProps("email")}
                />
                <TextInput
                  label="Mobile"
                  placeholder="Enter your mobile number"
                  {...form.getInputProps("mobile")}
                />

                <Select
                  {...form.getInputProps("country")}
                  label="Country"
                  placeholder="Select country"
                  data={
                    countryData?.data?.map((data) => ({
                      value: data.id.toString(),
                      label: data.name,
                    })) || []
                  }
                  searchable
                  onChange={(val: any) => {
                    changeCountry(val);
                  }}
                />
                <Select
                  {...form.getInputProps("state")}
                  label="State"
                  placeholder="Select state"
                  data={
                    stateData?.data?.map((data) => ({
                      value: data.id.toString(),
                      label: data.name,
                    })) || []
                  }
                  searchable
                  onChange={(value: any) => {
                    getStateId(value);
                  }}
                />
                <TextInput
                  label="Door number"
                  placeholder="Enter your door number"
                  {...form.getInputProps("doorNumber")}
                />
                <TextInput
                  label="Street name"
                  placeholder="Enter your street name"
                  {...form.getInputProps("streetName")}
                />
                <TextInput
                  label="Pincode"
                  placeholder="Enter your pincode"
                  {...form.getInputProps("pinCode")}
                />
              </div>
              <div className="flex justify-center pt-6 pb-4">
                <Button
                  variant="filled"
                  fullWidth
                  type="submit"
                  loading={loading}
                >
                  Submit
                </Button>
              </div>
            </form>
          </Modal>
        </div>
      ) : (
        <form onSubmit={loginForm.onSubmit(onSubmit)}>
          <div className="flex items-center justify-center min-h-screen bg-gradient-to-t from-ice-cold via-medium-purple to-purple-pain">
            <div className="flex w-full border-2 flex-col space-y-5 p-5 bg-white shadow-inner rounded-xl border-cyan-800 max-sm:p-1 sm:w-full sm:max-w-xl ">
              <div className="flex flex-col space-y-2 sm:w-full">
                <div className="flex justify-center items-center flex-col space-y-2">
                  <span className="text-2xl font-bold sm:text-4xl ">Login</span>
                  <span className="font-extralight text-gray-400">
                    Welcome to The Boys
                  </span>
                </div>
                <div className="relative">
                  <TextInput
                    {...loginForm.getInputProps("email")}
                    withAsterisk
                    label="Email"
                    placeholder="your@email.com"
                    className="w-full p-2 custom-text-input "
                  />
                </div>
                <div className="flex justify-center p-2">
                  <Button
                    variant="filled"
                    loading={loader}
                    className="bg-blue-900 hover:bg-gradient-to-t hover:from-blue-600 hover:to-blue-300 hover:text-black"
                    type="submit"
                    fullWidth
                  >
                    Generate otp
                  </Button>
                </div>
                <div className="p-3 flex flex-col items-center">
                  <span className="text-sm font-light text-gray-500">
                    Do'not have a account yet?
                  </span>
                  <span
                    className="text-sm hover:cursor-pointer"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Create an account
                  </span>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default Login;
