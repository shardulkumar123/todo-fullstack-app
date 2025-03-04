"use client";

import * as React from "react";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { CssBaseline } from "@mui/material";

const createEmotionCache = () => {
  return createCache({ key: "css", prepend: true });
};

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = React.useMemo(() => createEmotionCache(), []);
  return (
    <CacheProvider value={cache}>
      <CssBaseline />
      {children}
    </CacheProvider>
  );
}
