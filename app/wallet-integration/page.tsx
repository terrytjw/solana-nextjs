import { PingButton } from "@/components/wallet-integration/PingButton";
import React from "react";

const WalletIntegration = () => {
  return (
    <main className="mt-40 flex justify-center">
      <div className="flex flex-col gap-y-8">
        <h1 className="text-3xl font-bold">Wallet Integration</h1>
        <PingButton />
      </div>
    </main>
  );
};

export default WalletIntegration;
