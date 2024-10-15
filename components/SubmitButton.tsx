"use client";
import * as React from "react";
import { PathnerABI } from '@/abi/PathnerABI';
import { PathnerAddress } from '@/abi/PathnerABI';
import {
  Transaction,
  TransactionButton,
  TransactionStatus,
  TransactionStatusAction,
  TransactionStatusLabel,
} from '@coinbase/onchainkit/transaction';
import type {
  TransactionError,
  TransactionResponse,
} from '@coinbase/onchainkit/transaction';
import type { Address, ContractFunctionParameters } from 'viem';
import { toast, useToast } from "@/hooks/use-toast";

interface SubmitButtonProps {
  token: Address;
  amount: number;
  claims: number;
}

export default function SubmitButton({
  token,
  amount,
  claims,
}: SubmitButtonProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const contracts = [
    {
      address: PathnerAddress,
      abi: PathnerABI,
      functionName: "createBounties",
      args: [token, amount, claims],
    },
  ] as unknown as ContractFunctionParameters[];

  const handleError = (err: TransactionError) => {
    console.error("Transaction error:", err);
  };

  const handleSuccess = (response: TransactionResponse) => {
    console.log("Transaction successful", response);
  };

  return (
    <Transaction
      contracts={contracts}
      className=""
      // capabilities={capabilities}
      chainId={84532}
      onError={handleError}
      onSuccess={handleSuccess}
    >
      <TransactionButton
        className="h-9 px-4 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90"
        disabled={isSubmitting}
        text="Submit Transaction"
      />
      <TransactionStatus>
        <TransactionStatusLabel />
        <TransactionStatusAction />
      </TransactionStatus>
    </Transaction>
  );
}