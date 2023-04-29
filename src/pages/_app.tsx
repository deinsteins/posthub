import Header from "@/components/Header";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from 'react-query';
import theme from "@/styles/theme";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}

export default MyApp;
