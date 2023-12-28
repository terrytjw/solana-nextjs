"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { triggerCustomTxSuccessToast } from "../TriggerCustomTxSuccessToast";

const PROGRAM_ID = `ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa`;
const DATA_ACCOUNT_PUBKEY = `Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod`;

export const PingButton = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const onClick = async () => {
    if (!connection || !publicKey) {
      return;
    }

    const programId = new PublicKey(PROGRAM_ID);
    const programDataAccount = new PublicKey(DATA_ACCOUNT_PUBKEY);
    const transaction = new Transaction();

    const instruction = new TransactionInstruction({
      keys: [
        {
          pubkey: programDataAccount,
          isSigner: false,
          isWritable: true,
        },
      ],
      programId,
    });

    transaction.add(instruction);
    try {
      toast.loading("Sending transaction...");
      const signature = await sendTransaction(transaction, connection);
      toast.dismiss();
      triggerCustomTxSuccessToast(signature);
      console.log(`TX signature: ${signature}`);
    } catch (error) {
      toast.dismiss();
      toast.error(`Failed to send transaction: ${error}`);
      console.error("Failed to send transaction: ", error);
    }
  };

  return (
    <div className="flex justify-center">
      <Button onClick={onClick} disabled={!publicKey}>
        Ping
      </Button>
    </div>
  );
};
