import { CheckCircle2 } from "lucide-react";
import React, { useState } from "react";
interface Prop {
  address: string;
  truncate?: boolean;
}
const CryptoWalletAddress: React.FC<Prop> = ({ address, truncate = true }) => {
  const [copied, setCopied] = useState(false);

  const truncateAddress = (addr: string) => {
    if (!truncate) return addr;
    return `${addr.slice(0, 6)}...${addr.slice(-6)}`;
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 w-fit rounded-lg py-1 px-3 border border-gray-700 hover:border-gray-600 transition-all duration-300">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div>
            <div className="flex items-center gap-2">
              <code className="text-white font-mono text-sm select-all">
                {truncateAddress(address)}
              </code>
              <button
                onClick={handleCopy}
                className="relative group"
                title="Copy address"
              >
                {copied ? (
                  <CheckCircle2 className="text-green-500 h-5 w-5" />
                ) : (
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-gray-300 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        {copied && (
          <div className="text-xs text-green-400 animate-pulse">Copied!</div>
        )}
      </div>
    </div>
  );
};

export default CryptoWalletAddress;
