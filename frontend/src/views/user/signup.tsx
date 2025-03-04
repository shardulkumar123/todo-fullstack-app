"use client";

import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import usePost from "@/hooks/usePost";
import SnackbarComponent from "@/components/Snackbar";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Signup = () => {
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const router = useRouter();
  const { mutation, loading: isPending } = usePost(`/user/auth/sign-up`);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const response: any = await mutation(data);
      if (response?.success) {
        setSnackbarMessage(response?.message);
        router.push("/login");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setSnackbarMessage("Failed to sign up");
    }
  };

  const onLogin = () => router.push("/login");

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} sx={{ p: 4, mt: 8, textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Create an Account
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 2, display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Input
            control={control}
            label="Name"
            name="name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
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
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={isPending}
          >
            {isPending ? "Signing Up..." : "Sign Up"}
          </Button>
        </Box>
        <Divider sx={{ my: 2 }} />
        <Button variant="outlined" fullWidth sx={{ mt: 2 }} onClick={onLogin}>
          Already have an account? Login
        </Button>
      </Paper>
      <SnackbarComponent
        message={snackbarMessage}
        onClose={() => setSnackbarMessage(null)}
      />
    </Container>
  );
};

export default Signup;
