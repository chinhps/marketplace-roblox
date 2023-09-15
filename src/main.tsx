import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme";
import "@/styles/globalStyle.scss";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Default from "./components/layouts/Default";

const emotionCache = createCache({
  key: "chinhdev",
  prepend: false, // ensures styles are prepended to the <head>, instead of appended
});
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>

  <HelmetProvider>
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Default>
          <CacheProvider value={emotionCache}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </CacheProvider>
        </Default>
      </QueryClientProvider>
    </ChakraProvider>
  </HelmetProvider>
  // </React.StrictMode>
);
