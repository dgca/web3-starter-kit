import type { NextPage } from "next";
import Head from "next/head";
import { useWriteContract } from "wagmi";

import { Text } from "ui-kit";

import { MainLayout } from "@/components/Layouts/MainLayout";
import { useContracts } from "@/web3/WagmiContractsProvider";

type Todo = {
  text: string;
  completed: boolean;
};

function useTestContractReads(): [ReadonlyArray<Todo> | null, bigint | null] {
  const contracts = useContracts();
  try {
    const { data: todos } = contracts.TodoList().getAll.useRead();
    const { data: uint } = contracts.TestSolidityTypes().getUint.useRead();
    return [todos ?? null, uint ?? null];
  } catch (_err) {
    return [null, null];
  }
}

function useTestContractWrites() {
  const contracts = useContracts();
  const todoList = contracts.TodoList();
  const { writeContract } = useWriteContract();

  const { data } = todoList.add.useSimulateContract({
    args: ["hello"],
  });

  return () => {
    if (!data) return;
    writeContract(data.request);
  };
}

const Home: NextPage = () => {
  const [todos, uint] = useTestContractReads();
  const _handleAdd = useTestContractWrites();
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

          <Text.P>
            If you&apos;re running Hardhat locally, you should see some data
            below:
          </Text.P>

          <Text.P>
            todo: {todos?.at(0) ? JSON.stringify(todos.at(0)) : "—"}
          </Text.P>
          <Text.P>uint: {uint ? Number(uint) : "—"}</Text.P>

          <Text.P>Edit this content to get started!</Text.P>
        </div>
      </MainLayout>
    </>
  );
};

export default Home;
