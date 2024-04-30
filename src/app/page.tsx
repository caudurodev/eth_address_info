'use client'

import { getEthAddressBalance, getRecentAddressTransactions } from '@/app/API';
import { useCallback, useState } from 'react';

export default function Home() {
  const [walletAddress, setWalletAddress] = useState('')
  const [walletBalanceInWei, setWalletBalanceInWei] = useState('0')
  const [walletTransactions, setWalletTransactions] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFiltering, setIsFiltering] = useState(false)
  const [isError, setIsError] = useState(false)

  const weiToEth = (wei: string, decimals = 18) => {
    const weiBigInt = BigInt(wei);
    const ethScale = BigInt('1' + '0'.repeat(18)); // Scale factor for converting Wei to ETH
    const displayScale = BigInt('1' + '0'.repeat(decimals)); // Additional scale for decimal precision

    // Scale the Wei value up by the required display precision
    let scaledWei = weiBigInt * displayScale * BigInt(10); // Multiply by 10 for rounding
    let ethValue = scaledWei / ethScale; // Convert to ETH

    // Perform rounding
    const roundOff = BigInt(5); // For rounding: 0.5 and above
    ethValue = (ethValue + roundOff) / BigInt(10); // Adjust back after rounding

    // Prepare formatted string with decimals
    const ethString = ethValue.toString();
    const integerPart = ethString.slice(0, -decimals) || '0'; // Handle cases where no integer part
    const fractionalPart = ethString.slice(-decimals).padStart(decimals, '0'); // Ensure leading zeros

    return `${integerPart}.${fractionalPart} ETH`;
  };

  const getAddressData = useCallback(async () => {
    setIsLoading(true)
    console.log('getting balance')
    try {
      const data = await Promise.all([
        getEthAddressBalance(walletAddress),
        getRecentAddressTransactions(walletAddress)
      ])
      const balance = data[0]
      setWalletBalanceInWei(balance)
      const transactions = data[1]
      setWalletTransactions(transactions)

      setIsLoading(false)
    } catch (e) {
      console.log(e)
      setIsError(false)
    }
  }, [walletAddress])

  const filteredTransactionsList = walletTransactions.filter((t) =>
    isFiltering ? t.value > 0 : true
  )
  const isShowAddressData = !isLoading && walletAddress && walletBalanceInWei && walletTransactions.length > 0

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="text-xl p-4">
        walletAddress:
      </div>
      <div className="text-xl p-4">
        {walletAddress}
      </div>
      <input
        placeholder="Enter wallet address"
        type="text"
        className="text-black p-4 rounded-lg"
        value={walletAddress}
        onChange={(e) => setWalletAddress(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-4 rounded-lg m-4"
        disabled={!walletAddress}
        onClick={getAddressData}
      >
        Get Address Info
      </button>
      Filter Transactions
      <label> on
        <input type="radio" checked={isFiltering} onChange={() => setIsFiltering(true)} />
      </label>
      <label> off
        <input type="radio" checked={!isFiltering} onChange={() => setIsFiltering(false)} />
      </label>


      {isShowAddressData && <div className="text-3xl">
        <div>
          Balance: {weiToEth(walletBalanceInWei, 4)}
        </div>
        {walletTransactions && walletTransactions.length > 0 ?
          <>
            <div>History</div>
            <ul className="">
              {
                filteredTransactionsList.map((t, i) => (
                  <li key={i} className="p-4 border-b-3 border-b-red-400 text-sm">
                    {`From: ${t?.from} To: ${t?.to} Value: ${weiToEth(t?.value, 4)}`}
                  </li>
                ))
              }
            </ul>
          </>
          :
          <p>No transactions</p>
        }
      </div>
      }
    </main>
  );
}
