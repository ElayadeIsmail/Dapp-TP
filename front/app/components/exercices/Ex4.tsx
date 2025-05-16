import { useState } from "react";
import Ex4ABI from "../../abis/Ex4.json";
import { useContract } from "../../hooks/useContract";
import { NETWORK_ID } from "app/lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Ex4() {
  const { contract, account, isLoading } = useContract(
    Ex4ABI.abi,
    Ex4ABI.networks[NETWORK_ID].address,
  );

  const [inputNumber, setInputNumber] = useState<number | undefined>();
  const [result, setResult] = useState<boolean | null>(null);

  if (isLoading) return <span>Loading...</span>;

  const checkIsPositive = async () => {
    if (inputNumber === undefined || inputNumber === null) {
      alert("Please enter a number.");
      return;
    }

    try {
      const isPositive = await contract.methods
        .isPositive(inputNumber)
        .call({ from: account });
      setResult(isPositive);
    } catch (error: any) {
      alert("Error calling contract: " + error.message);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
      <div className="space-y-4">
        <Input
          label="Number"
          type="number"
          placeholder="Enter a number"
          value={inputNumber ?? ""}
          onChange={(e) => {
            const n = parseInt(e.target.value);
            setInputNumber(isNaN(n) ? undefined : n);
          }}
        />
        <Button onClick={checkIsPositive}>Check if Positive</Button>
      </div>

      <div className="flex flex-col justify-center items-center px-4">
        <h2 className="text-indigo-600 font-bold text-2xl mb-4">Result</h2>
        {result !== null ? (
          <span
            className={`text-3xl font-bold ${
              result ? "text-green-600" : "text-red-600"
            }`}
          >
            {result ? "True ✅" : "False ❌"}
          </span>
        ) : (
          <p className="text-gray-500">No result yet</p>
        )}
      </div>
    </div>
  );
}
