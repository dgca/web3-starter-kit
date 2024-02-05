import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";

import { Text } from "ui-kit";

import { ThemeToggle } from "../ThemeProvider/ThemeProvider";

type Props = {
  children: ReactNode;
};

export function MainLayout({ children }: Props) {
  return (
    <div className="flex flex-col items-stretch min-h-svh">
      <nav className="flex justify-between items-center border-b py-2 px-4 sticky top-0 bg-card">
        <Text.H3 as="span" className="font-extrabold">
          Web3 Starter Kit
        </Text.H3>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <ConnectButton />
        </div>
      </nav>

      <main className="flex-grow">{children}</main>

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
            href="https://github.com/dgca/web3-starter-kit/tree/main/packages/frontend  "
            className="hover:underline"
            target="_blank"
            rel="noopener"
          >
            Github
          </a>
        </Text.Small>
      </footer>
    </div>
  );
}
