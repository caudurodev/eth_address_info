import { format } from 'date-fns';

export const weiToEth = (wei: string, decimals = 18) => {
    const weiBigInt = BigInt(wei);
    const ethScale = BigInt('1' + '0'.repeat(18));
    const displayScale = BigInt('1' + '0'.repeat(decimals));

    // Scale the Wei value up by the required display precision
    let scaledWei = weiBigInt * displayScale * BigInt(10);
    let ethValue = scaledWei / ethScale;

    // Perform rounding
    const roundOff = BigInt(5);
    ethValue = (ethValue + roundOff) / BigInt(10);

    // Prepare formatted string with decimals
    const ethString = ethValue.toString();
    const integerPart = ethString.slice(0, -decimals) || '0';
    const fractionalPart = ethString.slice(-decimals).padStart(decimals, '0');

    return `${integerPart}.${fractionalPart} ETH`;
};

export const convertTimestampToDate = (timestamp: string) => {
    const date = new Date(Number(timestamp) * 1000);
    return format(date, 'dd/MM/yyyy');
}