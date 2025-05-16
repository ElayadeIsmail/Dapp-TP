import { useState } from "react";
import Ex1ABI from "../../abis/Ex2.json";
import { useContract } from "../../hooks/useContract";
import { NETWORK_ID } from "app/lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Ex2() {
  const { contract, account, isLoading } = useContract(
    Ex1ABI.abi,
    Ex1ABI.networks[NETWORK_ID].address,
  );
  const [amount, setAmount] = useState<number>();
  const [result, setResult] = useState<number | null>(null);

  if (isLoading) return <span>Loading...</span>;

  const convert = async () => {
    if (!amount) return;
    const res = await contract.methods.toWei(amount).call({ from: account });
    setResult(res);
  };

  return (
    <div className="grid grid-cols-2  py-4">
      <div className="grid col-span-1 gap-2 ">
        <Input
          value={amount}
          onChange={({ target: { value } }) => {
            const number = parseInt(value);
            if (!isNaN(number)) {
              setAmount(number);
            }
          }}
          type="number"
          label="Amount"
        />

        <Button onClick={convert}>Convert</Button>
      </div>
      <div className="grid col-span-1">
        <span className="text-center text-indigo-400 font-bold text-2xl">
          Result In Wei:
        </span>
        {result && (
          <span className="text-center mt-4 text-indigo-800 font-bold text-4xl">
            {result}
          </span>
        )}
      </div>
    </div>
  );
}
