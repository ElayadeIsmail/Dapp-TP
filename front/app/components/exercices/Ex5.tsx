import { useState } from "react";
import Ex5ABI from "../../abis/Ex5.json";
import { useContract } from "../../hooks/useContract";
import { NETWORK_ID } from "app/lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Ex5() {
  const { contract, account, isLoading } = useContract(
    Ex5ABI.abi,
    Ex5ABI.networks[NETWORK_ID].address,
  );

  const [inputNumber, setInputNumber] = useState<number | undefined>();
  const [result, setResult] = useState<boolean | null>(null);

  if (isLoading) return <span>Loading...</span>;

  const checkIsEven = async () => {
    if (inputNumber === undefined || inputNumber === null) {
      alert("Please enter a number.");
      return;
    }

    try {
      const isEven = await contract.methods
        .isEven(inputNumber)
        .call({ from: account });
      setResult(isEven);
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
        <Button onClick={checkIsEven}>Check if Even</Button>
      </div>

      <div className="flex flex-col justify-center items-center px-4">
        <h2 className="text-indigo-600 font-bold text-2xl mb-4">Result</h2>
        {result !== null ? (
          <span
            className={`text-3xl font-bold ${
              result ? "text-green-600" : "text-red-600"
            }`}
          >
            {result ? "Even ✅" : "Odd ❌"}
          </span>
        ) : (
          <p className="text-gray-500">No result yet</p>
        )}
      </div>
    </div>
  );
}
