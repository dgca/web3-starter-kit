import { ConnectButton } from "@rainbow-me/rainbowkit";
import { GetServerSideProps } from "next";
import { Creepster } from "next/font/google";
import Head from "next/head";
import { ComponentProps } from "react";

import { Text } from "ui-kit";
import { cn } from "ui-utils";

import { ContractGUI } from "../components/ContractGUI/ContractGUI";
import { ThemeToggle } from "../components/ThemeProvider/ThemeProvider";
import { getContractsMap } from "../lib/getContractsMap";

const creepster = Creepster({
  subsets: ["latin"],
  weight: "400",
});

type Props = ComponentProps<typeof ContractGUI>;

export default function Home({ contracts }: Props) {
  return (
    <>
      <Head>
        <title>Contract GUI</title>
        <meta
          content="Generate read and write functions from smart contract ABIs"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>
      <div className="flex flex-col items-stretch min-h-svh">
        <nav className="flex justify-between items-center border-b py-2 px-4 sticky top-0 bg-card">
          <span className={cn(creepster.className, "text-4xl")}>
            Contract GUI
          </span>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <ConnectButton />
          </div>
        </nav>

        <main className="px-4 flex-grow">
          <ContractGUI contracts={contracts} />
        </main>

        <footer className="text-center py-6">
          <Text.Small>
            Built by{" "}
            <a
              href="https://warpcast.com/typeof.eth"
              className="hover:underline"
              target="_blank"
              rel="noopener"
            >
              typeof.eth
            </a>{" "}
            •{" "}
            <a
              href="https://github.com/dgca/web3-starter-kit/tree/main/packages/contract-gui"
              className="hover:underline"
              target="_blank"
              rel="noopener"
            >
              Github
            </a>
          </Text.Small>
        </footer>
      </div>
    </>
  );
}

export const getServerSideProps = (async () => {
  const contractsMap = await getContractsMap();
  return {
    props: {
      contracts: contractsMap,
    },
  };
}) satisfies GetServerSideProps<Props>;
