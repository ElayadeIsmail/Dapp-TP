import { useState } from "react";
import Ex1ABI from "../../abis/Ex1.json";
import { useContract } from "../../hooks/useContract";
import { NETWORK_ID } from "app/lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Ex1() {
  const { contract, account, isLoading } = useContract(
    Ex1ABI.abi,
    Ex1ABI.networks[NETWORK_ID].address,
  );
  const [a, setA] = useState<number>();
  const [b, setB] = useState<number>();
  const [result, setResult] = useState<number | null>(null);

  if (isLoading) return <span>Loading...</span>;

  const handleAdd = async () => {
    if (!a || !b) return;
    const res = await contract.methods.add(a, b).call({ from: account });
    setResult(res);
  };

  return (
    <div className="grid grid-cols-2  py-4">
      <div className="grid col-span-1 gap-2 ">
        <Input
          value={a}
          onChange={({ target: { value } }) => {
            const number = parseInt(value);
            if (!isNaN(number)) {
              setA(number);
            }
          }}
          type="number"
          label="Number 1"
        />
        <Input
          value={b}
          onChange={({ target: { value } }) => {
            const number = parseInt(value);
            if (!isNaN(number)) {
              setB(number);
            }
          }}
          type="number"
          label="Number 2"
        />
        <Button onClick={handleAdd}>Add</Button>
      </div>
      <div className="grid col-span-1">
        <span className="text-center text-indigo-400 font-bold text-2xl">
          Result:
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
