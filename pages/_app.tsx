import "@/styles/scss/main.scss";
import type { AppProps } from "next/app";
import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
import { Poppins } from "next/font/google";
import { ActivityProvider } from "@/context/ActivityContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(
    <ActivityProvider>
      <main
        className={poppins.className}
        style={{ display: "flex", flexDirection: "column", flexGrow: "1" }}
      >
        <Component {...pageProps} />
      </main>
    </ActivityProvider>
  );
}
