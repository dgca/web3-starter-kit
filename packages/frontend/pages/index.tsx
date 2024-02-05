import type { NextPage } from "next";
import Head from "next/head";

import { Text } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Web3 Starter Kit</title>
        <meta
          name="description"
          content="A starter kit for building web3 applications with RainbowKit, wagmi, and Next.js"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <MainLayout>
        <div className="container px-4 py-12 mx-auto">
          <Text.H1>Hello web3!</Text.H1>

          <Text.P>
            This is a starter kit for building web3 frontends with the following
            technologies:
          </Text.P>

          <ul className="list-disc list-inside mt-4">
            <li>Next.js</li>
            <li>RainbowKit</li>
            <li>wagmi</li>
            <li>Tailwind</li>
            <li>shadcn/ui</li>
          </ul>

          <Text.P>Edit this content to get started!</Text.P>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
