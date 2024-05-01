const ETHERSCAN_API_URL = 'https://api.etherscan.io/api';

export const getEthAddressBalance = async (address: string) => {
    const request = new URL(ETHERSCAN_API_URL);
    request.searchParams.append('module', 'account');
    request.searchParams.append('action', 'balance');
    request.searchParams.append('address', address);
    request.searchParams.append('tag', 'latest');
    request.searchParams.append('apikey', process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY!);
    try {
        const response = await fetch(request.toString());
        const parsedResponse = await response.json();
        return parsedResponse.result
    } catch (e) {
        return null;
    }
}

export const getRecentAddressTransactions = async (address: string) => {
    const request = new URL(ETHERSCAN_API_URL);
    request.searchParams.append('module', 'account');
    request.searchParams.append('action', 'txlist');
    request.searchParams.append('address', address);
    request.searchParams.append('startblock', '0');
    request.searchParams.append('endblock', '99999999');
    request.searchParams.append('sort', 'desc');
    request.searchParams.append('apikey', process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY!);
    request.searchParams.append('page', '1');
    request.searchParams.append('offset', '10');
    try {
        const response = await fetch(request.toString());
        const parsedResponse = await response.json();
        return parsedResponse.result
    } catch (e) {
        return null;
    }
}