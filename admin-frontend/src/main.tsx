import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import { ChakraProvider } from "@chakra-ui/react";
import "./styles/globalStyle.scss";
import theme from "./theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const queryClient = new QueryClient();
const emotionCache = createCache({
  key: "chinhdev",
  prepend: false, // ensures styles are prepended to the <head>, instead of appended
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <CacheProvider value={emotionCache}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CacheProvider>
  </ChakraProvider>
);
