"use client";

require("@solana/wallet-adapter-react-ui/styles.css");
import Image from "next/image";
import dynamic from "next/dynamic";
import { useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { ThemeToggle } from "./ThemeToggle";

// Use of next/dynamic is needed because the @solana/wallet-adapter-react-ui library likely contains
// components that have browser-specific code, which is not executed on the server when Next.js does
// server-side rendering. If the components change their rendered output after being mounted on the
// client due to this browser-specific code, it could lead to errors.
// With this modification, the WalletMultiButton component will only be imported and rendered on the client,
// avoiding the server/client HTML mismatch issue. Note that this will cause the WalletMultiButton
// component to be rendered with a bit of a delay since it will only start loading once the JavaScript for
// the page starts executing on the client.
const WalletMultiButton = dynamic(
  () =>
    import("@solana/wallet-adapter-react-ui").then(
      (mod) => mod.WalletMultiButton,
    ),
  { ssr: false, loading: () => <p>wallet button loading...</p> },
);

// const WalletConnectButton = dynamic(
//   () =>
//     import("@solana/wallet-adapter-react-ui").then(
//       (mod) => mod.WalletConnectButton,
//     ),
//   { ssr: false, loading: () => <p>wallet button loading...</p> },
// );

// const WalletDisconnectButton = dynamic(
//   () =>
//     import("@solana/wallet-adapter-react-ui").then(
//       (mod) => mod.WalletDisconnectButton,
//     ),
//   { ssr: false, loading: () => <p>wallet button loading...</p> },
// );

export const AppBar = () => {
  return (
    <div className="flex justify-between bg-stone-900 px-8 py-4">
      <Image src="/solanaLogo.png" alt="solana-logo" height={20} width={300} />
      <div className="flex items-center gap-x-2">
        <WalletMultiButton />
        <ThemeToggle />
      </div>
    </div>
  );
};
