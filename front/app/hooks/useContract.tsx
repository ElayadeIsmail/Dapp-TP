import { useEffect, useState } from "react";
import Web3 from "web3";

interface ContractData {
  networkId?: bigint;
  balance?: string;
  contractOwner?: string;
  isConnected: boolean;
  loading: boolean;
  error?: string;
}

export const useContract = (abi: any, address: string) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [contract, setContract] = useState<any>(null);
  const [data, setData] = useState<ContractData>({
    isConnected: false,
    loading: true,
  });

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        if (typeof window !== "undefined" && (window as any).ethereum) {
          const provider = (window as any).ethereum;
          const _web3 = new Web3(provider);

          // Prompt user for account access
          const accounts: string[] = await provider.request({
            method: "eth_requestAccounts",
          });
          const userAccount = accounts[0];
          setAccount(userAccount);

          // Create contract instance
          const _contract = new _web3.eth.Contract(abi, address);
          setContract(_contract);
          setWeb3(_web3);

          // Fetch additional data
          const networkId = await _web3.eth.net.getId();
          const balance = await _web3.eth.getBalance(userAccount);

          // Try to get contract owner (assuming contract has an 'owner' method)
          let contractOwner;
          try {
            contractOwner = (await _contract.methods.owner().call()) as string;
          } catch (error) {
            // Owner method might not exist on all contracts
            console.log("Contract might not have an owner method");
          }

          setData({
            networkId,
            balance: _web3.utils.fromWei(balance, "ether"),
            contractOwner,
            isConnected: true,
            loading: false,
          });

          // Setup event listeners for account/chain changes
          provider.on("accountsChanged", (newAccounts: string[]) => {
            setAccount(newAccounts[0]);
          });

          provider.on("chainChanged", () => {
            window.location.reload();
          });
        } else {
          setData({
            isConnected: false,
            loading: false,
            error: "Ethereum provider not found",
          });
          console.error("Ethereum provider not found");
        }
      } catch (err) {
        setData({
          isConnected: false,
          loading: false,
          error: err instanceof Error ? err.message : "Unknown error",
        });
        console.error("Failed to load Web3 or contract:", err);
      } finally {
        setIsLoading(false);
      }
    };

    init();

    // Cleanup function to remove event listeners
    return () => {
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const provider = (window as any).ethereum;
        provider.removeListener("accountsChanged", () => {});
        provider.removeListener("chainChanged", () => {});
      }
    };
  }, [abi, address]);

  return { web3, account, contract, data, isLoading };
};
