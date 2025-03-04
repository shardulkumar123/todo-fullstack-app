"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  Container,
  Box,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "@/components/Input";
import usePost from "@/hooks/usePost";
import SnackbarComponent from "@/components/Snackbar";

const schema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const router = useRouter();
  const { mutation, loading: isPending } = usePost(`/user/auth/login`);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await mutation(data);
      if (response?.success) {
        setSnackbarMessage(response?.message);
        router.push("/");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSnackbarMessage("Failed to login");
    }
  };

  const onCreateAccount = () => router.push("/sign-up");

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Input
            control={control}
            label="Email"
            name="email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            control={control}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button
            type="submit"
            disabled={isPending}
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isPending ? "Login..." : "Login"}
          </Button>
        </Box>
        <Divider />
        <Button
          variant="outlined"
          fullWidth
          sx={{ mt: 2 }}
          onClick={onCreateAccount}
        >
          Create an Account
        </Button>
      </Paper>
      <SnackbarComponent
        message={snackbarMessage}
        onClose={() => setSnackbarMessage(null)}
      />
    </Container>
  );
};

export default Login;
