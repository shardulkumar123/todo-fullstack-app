"use client";
import { useState } from "react";
import axiosInstance from "../service/axiosInstance";

const usePatch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const mutation = async (body: unknown) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.patch<{ data: T }>(url, body);
      setData(response.data.data);
      return response.data;
    } catch (err) {
      setError((err as Error).message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, mutation };
};

export default usePatch;
