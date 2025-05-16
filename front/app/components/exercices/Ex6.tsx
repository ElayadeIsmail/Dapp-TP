import { useState } from "react";
import Ex3ABI from "../../abis/Ex3.json";
import { useContract } from "../../hooks/useContract";
import { NETWORK_ID } from "app/lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Ex6() {
  const { contract, account, isLoading } = useContract(
    Ex3ABI.abi,
    Ex3ABI.networks[NETWORK_ID].address,
  );

  const [input, setInput] = useState("");
  const [result, setResult] = useState<string>("");

  if (isLoading) return <span>Loading...</span>;

  const handleSet = async () => {
    try {
      await contract.methods.setString(input).send({ from: account });
      setResult("String stored successfully.");
    } catch (err: any) {
      setResult("Error setting string: " + err.message);
    }
  };

  const handleGet = async () => {
    try {
      const value = await contract.methods.storedString().call();
      setResult("Stored string: " + value);
    } catch (err: any) {
      setResult("Error fetching string: " + err.message);
    }
  };

  const handleLength = async () => {
    try {
      const len = await contract.methods.getLength().call();
      setResult("String length: " + len);
    } catch (err: any) {
      setResult("Error getting length: " + err.message);
    }
  };

  const handleFirstChar = async () => {
    try {
      const charBytes = await contract.methods.getFirstChar().call();
      const char = String.fromCharCode(parseInt(charBytes, 16));
      setResult("First character: " + char);
    } catch (err: any) {
      setResult("Error getting first character: " + err.message);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 py-6">
      <div className="flex flex-col gap-4">
        <Input
          label="Enter value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a string"
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button onClick={handleSet}>Set</Button>
          <Button onClick={handleGet}>Get</Button>
          <Button onClick={handleLength}>Length</Button>
          <Button onClick={handleFirstChar}>First Char</Button>
        </div>
      </div>

      <div className="p-4 rounded-md border bg-muted text-center font-semibold text-indigo-700">
        {result || "No output yet"}
      </div>
    </div>
  );
}
