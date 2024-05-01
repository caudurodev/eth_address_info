import { useState } from "react";
import { Card, CardHeader, CardBody, Switch, Snippet } from "@nextui-org/react";
import { weiToEth, convertTimestampToDate } from '@/app/utils';
import { motion } from 'framer-motion';

export type Transaction = {
    to: string
    from: string
    value: string
    timeStamp: string
}
interface TransactionsTableProps {
    walletTransactions: Transaction[]
    isLoading: boolean
}
export const TransactionsTable = ({ walletTransactions, isLoading }: TransactionsTableProps) => {
    const [isFiltering, setIsFiltering] = useState(false)
    const filteredTransactionsList = walletTransactions.filter((t) =>
        isFiltering ? t.value !== '0' : true
    )
    const rowVariants = {
        initial: { opacity: 0, x: -10 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 10 }
    };
    if (!filteredTransactionsList || filteredTransactionsList.length === 0 || isLoading) return
    return (
        <Card className="py-4" fullWidth>
            <CardHeader className="pb-2 pt-2 px-4 flex-row justify-between">
                <div>
                    <h4 className="font-bold text-large">Transactions found</h4>
                    <p>Transactions limited to one page of results from Etherscan</p>
                </div>
                <div className="mr-4">
                    <Switch
                        isSelected={isFiltering}
                        onValueChange={() => { setIsFiltering(!isFiltering) }}
                    >
                        Only positive
                    </Switch>
                </div>
            </CardHeader>
            <CardBody className="overflow-visible py-2">
                <div className="overflow-x-auto">
                    {filteredTransactionsList.length > 0 ? (
                        <table className="table-auto bg-white text-black dark:bg-black dark:text-white w-full">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2">DATE</th>
                                    <th className="px-4 py-2">TO</th>
                                    <th className="px-4 py-2">FROM</th>
                                    <th className="px-4 py-2">VALUE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredTransactionsList.map((t, i) => (
                                    <motion.tr
                                        key={`${i}_${t.to}`}
                                        variants={rowVariants}
                                        initial="initial"
                                        animate="animate"
                                        exit="exit"
                                        transition={{ delay: i * 0.05, type: "just" }}
                                    >
                                        <td className="text-xs max-w-[100px]  px-2 py-1">
                                            {convertTimestampToDate(t.timeStamp)}
                                        </td>
                                        <td className="max-w-[100px] md:max-w-[200px] lg:max-w-[360px] truncate px-2 py-2">
                                            <Snippet symbol="" size="sm">{t.to}</Snippet>
                                        </td>
                                        <td className="max-w-[100px] md:max-w-[200px] lg:max-w-[360px] truncate px-2 py-2">
                                            <Snippet symbol="" size="sm">{t.from}</Snippet>
                                        </td>
                                        <td className="px-4 py-2">{weiToEth(t.value, 4)}</td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>) : (
                        <div className="text-center">No transactions found</div>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default TransactionsTable;