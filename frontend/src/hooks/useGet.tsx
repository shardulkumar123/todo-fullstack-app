"use client";
import { useState, useEffect } from "react";
import axiosInstance from "../service/axiosInstance";

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useGet = <T,>(url: string, skip = false): ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!skip);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (skip) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get<{ data: T }>(url);
        setData(data.data);
        return data;
      } catch (err) {
        setError((err as Error).message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, skip]);

  return { data, loading, error };
};

export default useGet;
