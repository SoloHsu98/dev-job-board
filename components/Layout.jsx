import React from "react";
import Navbar from "./Navbar";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Software Developer Jobs</title>
      </Head>
      <Navbar />
      <main className="container mx-auto px-4 py-10 sm:px-32">{children}</main>
    </div>
  );
}
