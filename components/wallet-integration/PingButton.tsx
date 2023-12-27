"use client";

import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from "@solana/web3.js";
import { Button } from "../ui/button";
import toast, { Toast } from "react-hot-toast";
import Link from "next/link";
import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

const triggerCustomToast = (signature: string) => {
  toast.custom(
    (t: Toast) => (
      <div>
        {t.visible && (
          <div
            className={`pointer-events-auto flex w-full max-w-md rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 p-4">
              <div className="flex items-start">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Transaction successful ✅
                  </p>
                  <p className="text-sm font-medium text-gray-900">
                    View transaction on{" "}
                    <Link
                      href={`https://solana.fm/tx/${signature}`}
                      className="inline-flex items-center underline"
                      target="_blank"
                    >
                      SolanaFM
                      <OpenInNewWindowIcon />
                    </Link>
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-indigo-600 hover:bg-indigo-100 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    ),
    { duration: Infinity },
  );
};

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
      triggerCustomToast(signature);
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
