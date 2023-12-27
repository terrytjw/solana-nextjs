"use client";

require("@solana/wallet-adapter-react-ui/styles.css");
import Image from "next/image";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
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
  const { publicKey, connect, disconnect } = useWallet();

  // TODO: find a fix for connecting wallet automatically on phantom wallet account change
  //       currently, disconnect() works, but connect() doesn't
  useEffect(() => {
    // @ts-ignore
    const provider = window.solana;

    if (provider) {
      const handleAccountChange = async (newPublicKey: any) => {
        console.log("provider -> ", provider);
        try {
          // Disconnect the current wallet session
          await disconnect();

          // Reconnect to the new account
          if (newPublicKey) {
            console.log(`Switched to account ${newPublicKey.toBase58()}`);

            // await connect();
            // console.log(`Switch successful`);
          }
        } catch (err) {
          console.error("Failed to connect to the new account:", err);
        }
      };

      provider.on("accountChanged", handleAccountChange);

      // Clean up the event listener when the component unmounts
      return () => {
        provider.removeListener("accountChanged", handleAccountChange);
      };
    }
  }, [disconnect, connect]);

  return (
    <div className="flex justify-between border-b-[0.1px] border-gray-600 px-8 py-4">
      <Image src="/solanaLogo.png" alt="solana-logo" height={20} width={300} />
      <div className="flex items-center gap-x-2">
        <WalletMultiButton />
        {/* <ThemeToggle /> */}
      </div>
    </div>
  );
};
