import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import Layout from "../components/Layout";
import RouteGuard from "../components/RouteGuard";
import { SWRConfig } from "swr";
import { Fragment } from "react";
import Script from "next/script";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Fragment>
        <RouteGuard>
          <Layout>
            <SWRConfig
              value={{
                fetcher: async (url) => {
                  const res = await fetch(url);
                  // If the status code is not in the range 200-299,
                  // we still try to parse and throw it.
                  if (!res.ok) {
                    const error = new Error(
                      "An error occurred while fetching the data."
                    );
                    // Attach extra info to the error object.
                    error.info = await res.json();
                    error.status = res.status;
                    throw error;
                  }
                  return res.json();
                },
              }}
            >
              <Component {...pageProps} />
            </SWRConfig>
          </Layout>
        </RouteGuard>
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0&appId=859458035092183&autoLogAppEvents=1"
          nonce="x3hEZskq"
        />
      </Fragment>
    </>
  );
}

export default MyApp;
