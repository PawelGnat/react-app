import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
// import { socket } from "../../socket";

import { useClientsContext } from "../../context/ClientsContext";
import { useUsersContext } from "../../context/UsersContext";
import { useModalContext } from "../../context/ModalContext";

import { clientSchema } from "../../utils/zod-schema";
import { DB_URL } from "../../utils/database";

import {
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Button,
  Input,
  Select,
  Option,
} from "@mui/joy";

const ClientForm = () => {
  const { isLoading, clientId, dispatch } = useModalContext();
  const { clients } = useClientsContext();
  const { users } = useUsersContext();
  const client = clients.find((client) => client._id === clientId);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: client?.name || "",
      address: client?.address || "",
      userId: client?.userId || "",
    },
  });

  const handleApiRoute = () => {
    if (clientId) {
      return `${DB_URL}/clients/${clientId}`;
    }
    return `${DB_URL}/clients`;
  };

  const handleApiMethod = () => {
    if (clientId) {
      return "patch";
    }
    return "post";
  };

  const onSubmit = async (data: z.infer<typeof clientSchema>) => {
    if (isLoading) {
      return;
    }
    dispatch({ type: "LOADING", payload: { isLoading: true } });

    try {
      const response = await axios[handleApiMethod()](handleApiRoute(), data, {
        withCredentials: true,
      });
      if (response.status === 200) {
        // socket.emit("sendClients");
        dispatch({ type: "HIDE" });
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch({ type: "LOADING", payload: { isLoading: false } });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <FormControl error={!!errors.name}>
          <FormLabel>Clients name</FormLabel>
          <Input
            type="text"
            color="primary"
            placeholder="Name"
            variant="outlined"
            {...register("name", { required: true })}
          />
          <FormHelperText>
            {errors.name ? errors.name.message : ""}
          </FormHelperText>
        </FormControl>

        <FormControl error={!!errors.address}>
          <FormLabel>Clients address</FormLabel>
          <Input
            type="text"
            color="primary"
            placeholder="Address"
            variant="outlined"
            {...register("address", { required: true })}
          />
          <FormHelperText>
            {errors.address ? errors.address.message : ""}
          </FormHelperText>
        </FormControl>

        <Controller
          control={control}
          name="userId"
          render={({ field }) => (
            <FormControl>
              <FormLabel>Client assigned to</FormLabel>
              <Select
                {...register("userId")}
                onChange={field.onChange}
                defaultValue={field.value}
                color="primary">
                <Option value="">-</Option>
                {users.map((user) => (
                  <Option key={user._id} value={user._id}>
                    {user.name} {user.surname}
                  </Option>
                ))}
              </Select>
            </FormControl>
          )}
        />

        <Button type="submit" loading={isLoading} size="md" variant="solid">
          {clientId ? "Edit" : "Create"}
        </Button>
      </Stack>
    </form>
  );
};

export default ClientForm;
