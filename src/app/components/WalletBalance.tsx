
import { motion, AnimatePresence } from 'framer-motion'
import { weiToEth } from '@/app/utils';

interface WalletBalanceProps {
    walletBalanceInWei: string | null
    isLoading: boolean
}
export const WalletBalance = ({ walletBalanceInWei, isLoading }: WalletBalanceProps) => (
    <AnimatePresence>
        {!!walletBalanceInWei && !isLoading && (
            <motion.div
                initial={{ opacity: 0, }}
                animate={{ opacity: 1, }}
                exit={{
                    opacity: 0,
                    transition: {
                        opacity: { duration: 0.2 },
                    }
                }}
                transition={{
                    opacity: { duration: 0.3, delay: 0.3 },
                }}
            >
                <h4 className="text-xl font-bold text-black dark:text-white">Wallet Balance is</h4>
                <h2 className="text-4xl font-bold text-black dark:text-white">{weiToEth(walletBalanceInWei, 5)}</h2>
            </motion.div>
        )}
    </AnimatePresence>)

export default WalletBalance