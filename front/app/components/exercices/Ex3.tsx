import { useState } from "react";
import Ex3ABI from "../../abis/Ex3.json";
import { useContract } from "../../hooks/useContract";
import { NETWORK_ID } from "app/lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Ex3() {
  const { contract, account, isLoading } = useContract(
    Ex3ABI.abi,
    Ex3ABI.networks[NETWORK_ID].address,
  );

  const [inputMessage, setInputMessage] = useState("");
  const [secondString, setSecondString] = useState("");
  const [sliceStart, setSliceStart] = useState<number | undefined>(undefined);
  const [sliceEnd, setSliceEnd] = useState<number | undefined>(undefined);

  const [result, setResult] = useState<string | number | null>(null);
  if (isLoading) return <span>Loading...</span>;

  async function handleSetMessage() {
    if (!inputMessage) {
      alert("Please enter a message to set.");
      return;
    }
    try {
      await contract.methods.setString(inputMessage).send({ from: account });
      alert("Message set successfully!");
      setResult(null);
    } catch (error: any) {
      alert("Error setting message: " + error.message);
    }
  }

  // Get length of stored string
  async function handleGetLength() {
    try {
      const length = await contract.methods.getLength().call({ from: account });
      setResult(Number(length));
    } catch (error: any) {
      alert("Error fetching length: " + error.message);
    }
  }

  async function handleGetFirstChar() {
    try {
      const charHex = await contract.methods
        .getFirstChar()
        .call({ from: account });
      // Convert hex bytes1 to char
      const char = String.fromCharCode(parseInt(charHex.slice(2), 16));
      setResult(char);
    } catch (error: any) {
      alert("Error fetching first character: " + error.message);
    }
  }

  async function handleConcatenate() {
    if (!secondString) {
      alert("Please enter a second string to concatenate.");
      return;
    }
    try {
      const stored = await contract.methods
        .storedString()
        .call({ from: account });
      setResult(stored + secondString);
    } catch (error: any) {
      alert("Error concatenating strings: " + error.message);
    }
  }

  async function handleCompare() {
    if (!secondString) {
      alert("Please enter a second string to compare.");
      return;
    }
    try {
      const stored = await contract.methods
        .storedString()
        .call({ from: account });
      let comparison = 0;
      if (stored < secondString) comparison = -1;
      else if (stored > secondString) comparison = 1;
      setResult(comparison);
    } catch (error: any) {
      alert("Error comparing strings: " + error.message);
    }
  }

  async function handleSlice() {
    if (sliceStart === undefined || sliceEnd === undefined) {
      alert("Please enter both slice start and end indices.");
      return;
    }
    try {
      const stored = await contract.methods
        .storedString()
        .call({ from: account });
      const sliced = stored.slice(sliceStart, sliceEnd);
      setResult(sliced);
    } catch (error: any) {
      alert("Error slicing string: " + error.message);
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
      <div className="space-y-6">
        <div>
          <Input
            label="Message"
            placeholder="Enter message"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <div className="flex space-x-4 mt-3">
            <Button onClick={handleSetMessage}>Set Message</Button>
            <Button onClick={handleGetLength}>Get Length</Button>
            <Button onClick={handleGetFirstChar}>Get First Character</Button>
          </div>
        </div>

        <hr className="my-4" />

        <div>
          <Input
            label="Second String"
            placeholder="Enter second string"
            value={secondString}
            onChange={(e) => setSecondString(e.target.value)}
          />
          <div className="flex space-x-4 mt-3">
            <Button onClick={handleConcatenate}>Concatenate</Button>
            <Button onClick={handleCompare}>Compare</Button>
          </div>
        </div>

        <hr className="my-4" />

        <div>
          <div className="flex space-x-4">
            <Input
              label="Slice Start"
              type="number"
              placeholder="Start index"
              value={sliceStart !== undefined ? sliceStart : ""}
              onChange={(e) => {
                const n = parseInt(e.target.value);
                setSliceStart(isNaN(n) ? undefined : n);
              }}
            />
            <Input
              label="Slice End"
              type="number"
              placeholder="End index"
              value={sliceEnd !== undefined ? sliceEnd : ""}
              onChange={(e) => {
                const n = parseInt(e.target.value);
                setSliceEnd(isNaN(n) ? undefined : n);
              }}
            />
          </div>
          <Button className="mt-3" onClick={handleSlice}>
            Slice
          </Button>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center px-4">
        <h2 className="text-indigo-600 font-bold text-2xl mb-6">Result</h2>
        {result !== null ? (
          <pre className="whitespace-pre-wrap text-indigo-900 text-xl font-semibold">
            {result.toString()}
          </pre>
        ) : (
          <p className="text-gray-500">No result yet</p>
        )}
      </div>
    </div>
  );
}
