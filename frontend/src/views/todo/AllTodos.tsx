"use client";

import React, { FC } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import useGet from "@/hooks/useGet";
import { Button, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

interface ITodo {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

const AllTodos: FC = () => {
  const { push } = useRouter();
  const { data, loading } = useGet<ITodo[]>("/item");

  if (loading) {
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

  const columns: GridColDef[] = [
    { field: "title", headerName: "Title", flex: 1, minWidth: 150 },
    {
      field: "description",
      headerName: "Description",
      flex: 1.5,
      minWidth: 200,
    },
    { field: "created_at", headerName: "Created At", flex: 1, minWidth: 150 },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNavigation = (e: { id: any }) => {
    const itemId = e?.id;
    push(`/todo/${itemId}`);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <Typography variant="h6">All Todos</Typography>
        <Button
          type="button"
          variant="contained"
          onClick={() => push("/todo/new")}
        >
          Add Todo
        </Button>
      </Box>
      <Box sx={{ height: 500, width: "100%" }}>
        <DataGrid
          rows={data || []}
          columns={columns}
          pageSizeOptions={[10, 20, 50]}
          paginationMode="client"
          autoPageSize
          onRowClick={handleNavigation}
        />
      </Box>
    </Box>
  );
};

export default AllTodos;
