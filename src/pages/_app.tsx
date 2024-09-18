// src/pages/_app.tsx

import { ThemeProvider } from "@mui/material/styles";
import type { AppProps, AppType } from "next/app";
import theme from "../theme/theme";


import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
