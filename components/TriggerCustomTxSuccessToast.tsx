import Link from "next/link";
import toast, { Toast } from "react-hot-toast";

import { OpenInNewWindowIcon } from "@radix-ui/react-icons";

export const triggerCustomTxSuccessToast = (signature: string) => {
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
