import React, { useEffect, useState } from "react";
import { ArrowBack, Delete } from "@mui/icons-material";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/Input";
import { useForm } from "react-hook-form";
import usePost from "@/hooks/usePost";
import useGet from "@/hooks/useGet";
import usePatch from "@/hooks/usePatch";
import useDelete from "@/hooks/useDelete";
import SnackbarComponent from "@/components/Snackbar";
import { useParams, useRouter } from "next/navigation";

const schema = yup.object({
  title: yup.string().required("Title is required"),
  description: yup
    .string()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),
});

type FieldType = {
  title: string;
  description: string;
};

const TodoDetails = () => {
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const { id } = useParams();
  const router = useRouter();
  const createMode = id === "new";
  const userId = 1;
  const { data, loading } = useGet<FieldType>(`/item/${id}`, createMode);
  const { mutation, loading: isPending } = usePost(`/item`);
  const { mutation: updateMutation, loading: isUpdating } = usePatch(
    `/item/${id}`
  );
  const { mutation: deleteMutation, loading: isDeleting } = useDelete(`/item`);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (data) {
      setValue("title", data?.title);
      setValue("description", data?.description);
    }
  }, [data, setValue]);

  const onHandleSubmit = async (formData: {
    title: string;
    description: string;
  }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = createMode
        ? await mutation({ user_id: userId, ...formData })
        : await updateMutation(formData);
      if (response?.success) {
        setSnackbarMessage(response?.message);
        if (createMode) reset();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSnackbarMessage("Failed to submit data");
    }
  };

  const handleDelete = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await deleteMutation(id as string);
      if (response?.success) {
        setSnackbarMessage(response?.message);
        router.back();
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSnackbarMessage("Failed to submit data");
    }
  };

  if (loading || isPending || isUpdating || isDeleting) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 8 }}>
        <Box
          display="flex"
          justifyContent={`${createMode ? "" : "space-between"}`}
          alignItems="center"
        >
          <IconButton onClick={() => router.back()}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h5">Todo Details</Typography>
          {!createMode && (
            <IconButton onClick={handleDelete} color="error">
              <Delete />
            </IconButton>
          )}
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit(onHandleSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            marginTop: "15px",
          }}
        >
          <Input
            label="Title"
            control={control}
            name="title"
            error={!!errors.title}
            helperText={errors?.title?.message}
          />
          <Input
            label="Description"
            multiline
            rows={4}
            control={control}
            name="description"
            error={!!errors.description}
            helperText={errors?.description?.message}
          />
          <Button variant="contained" type="submit">
            {createMode ? "Add" : "Update"}
          </Button>
        </Box>
      </Paper>

      <SnackbarComponent
        message={snackbarMessage}
        onClose={() => setSnackbarMessage(null)}
      />
    </Container>
  );
};

export default TodoDetails;
