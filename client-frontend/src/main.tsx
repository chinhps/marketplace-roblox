import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/route";
import { ChakraProvider, Flex, Spinner } from "@chakra-ui/react";
import theme from "./theme";
import "@/styles/globalStyle.scss";
// import "@/styles/globalStyleMeoren.scss";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Default from "./components/layouts/Default";
import { Suspense } from "react";

const emotionCache = createCache({
  key: "chinhdev",
  prepend: false, // ensures styles are prepended to the <head>, instead of appended
});
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <HelmetProvider>
    <ChakraProvider theme={theme}>
      <CacheProvider value={emotionCache}>
        <QueryClientProvider client={queryClient}>
          <Default>
            <Suspense
              fallback={
                <Flex justifyContent="center" alignItems="center" h="100vh">
                  <Spinner color="white.100" />
                </Flex>
              }
            >
              <RouterProvider router={router} />
            </Suspense>
          </Default>
        </QueryClientProvider>
      </CacheProvider>
    </ChakraProvider>
  </HelmetProvider>
);
