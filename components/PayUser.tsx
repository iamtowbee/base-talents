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

interface PayUserButtonProps {
    recepients: Address[];
    token: number;
    amount: number;
  }

export default function FundAccount({ recepients, token, amount }: PayUserButtonProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

    const contracts = [
      {
        address: PathnerAddress,
        abi: PathnerABI,
        functionName: "payBounty",
        args: [ recepients, token, amount ],
      },
    ] as unknown as ContractFunctionParameters[];
  
    const handleError = (err: TransactionError) => {
      console.error('Transaction error:', err);
    };
  
    const handleSuccess = (response: TransactionResponse) => {
      console.log('Transaction successful', response);
    };
  
    return (
      <div className="flex w-[450px]">
        <Transaction
            contracts={contracts}
              className="w-[450px]"
              // capabilities={capabilities}
              chainId={85432}
              onError={handleError}
              onSuccess={handleSuccess} 

              >
              <TransactionButton
                className="w-full"
                disabled={isSubmitting}
                text="Pay User"
              />
              <TransactionStatus>
              <TransactionStatusLabel />
              <TransactionStatusAction />
              </TransactionStatus>
            </Transaction> 
      </div>
    );
}