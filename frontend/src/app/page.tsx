"use client";

import { useUser } from "@/context/UserContext";
import AllTodos from "@/views/todo/AllTodos";
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

  return <AllTodos />;
};

export default Home;
