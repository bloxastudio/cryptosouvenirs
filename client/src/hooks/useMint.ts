import { useCallback, useState } from "react";
import { ContractTransaction, ethers } from "ethers";
import CONFIG from "../config.json";
import { abi } from "../../../blockchain/build/artifacts/contracts/CryptoSouvenirs.sol/CryptoSouvenirs.json";

const useMint = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transaction, setTransaction] = useState<ContractTransaction | null>(
    null
  );

  const mint = useCallback(async (id: number) => {
    setLoading(true);

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONFIG.CONTRACT_ADDRESS,
        abi,
        signer
      );

      const transaction = await contract.mint(id);
      setTransaction(transaction);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { transaction, loading, error, mint };
};

export default useMint;
