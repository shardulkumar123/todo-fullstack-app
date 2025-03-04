"use client";

import { useUser } from "@/context/UserContext";
import AllTodos from "@/views/todo/AllTodos";
import { Box, Button, Divider } from "@mui/material";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { FC, useEffect } from "react";

const Home: FC = () => {
  const { user, isLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <p>Loading...</p>;

  return (
    <Box>
      <Box
        sx={{
          padding: "20px",
          display: "flex",
          justifyContent: "right",
        }}
      >
        <Button
          variant="outlined"
          onClick={() => {
            localStorage.clear();
            Cookies.remove("token");
            router.push("/login");
          }}
        >
          Log Out
        </Button>
      </Box>
      <Divider />
      <AllTodos />
    </Box>
  );
};

export default Home;
