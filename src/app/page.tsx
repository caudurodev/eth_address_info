'use client'

import { useState } from 'react';
import { Spinner } from "@nextui-org/react";
import { getEthAddressBalance, getRecentAddressTransactions } from '@/app/data';
import { AddressInputCard } from '@/app/components/AddressInputCard'
import { TransactionsTable, Transaction } from '@/app/components/TransactionsTable';
import { WalletBalance } from '@/app/components/WalletBalance'

export default function Home() {
  const [walletBalanceInWei, setWalletBalanceInWei] = useState(null)
  const [walletTransactions, setWalletTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const getAddressData = async (walletAddress: string) => {
    setIsLoading(true)
    try {
      const data = await Promise.all([
        getEthAddressBalance(walletAddress),
        getRecentAddressTransactions(walletAddress)
      ])
      setWalletBalanceInWei(data[0])
      setWalletTransactions(data[1])
      setIsLoading(false)
    } catch (e) {
      setIsError(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24 gap-8 max-w-6xl mx-auto">
      <AddressInputCard
        onGetData={getAddressData}
      />
      {isLoading && <Spinner />}
      {isError && <p className="text-red-500">Error fetching data</p>}
      <WalletBalance walletBalanceInWei={walletBalanceInWei} isLoading={isLoading} />
      <TransactionsTable walletTransactions={walletTransactions} isLoading={isLoading} />
    </main>
  );
}
