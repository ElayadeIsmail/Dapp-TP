import { useState } from "react";
import Ex8ABI from "../../abis/Ex8.json";
import { useContract } from "../../hooks/useContract";
import { NETWORK_ID } from "app/lib/constants";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function Ex8Component() {
  const { contract, account, web3, isLoading } = useContract(
    Ex8ABI.abi,
    Ex8ABI.networks[NETWORK_ID].address,
  );

  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [lastSender, setLastSender] = useState("");
  const [lastValue, setLastValue] = useState("");

  if (isLoading) return <span>Loading...</span>;

  if (!web3) {
    return <h1>Error init web3</h1>;
  }

  const sendEther = async () => {
    try {
      const valueInWei = web3.utils.toWei(amount, "ether");
      await contract.methods.sendEther().send({
        from: account,
        value: valueInWei,
      });
      setStatus(`✅ Sent ${amount} ETH successfully.`);
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Transaction failed: " + err.message);
    }
  };

  const fetchLast = async () => {
    try {
      const sender = await contract.methods.lastSender().call();
      const valueWei = await contract.methods.lastValue().call();
      const valueEth = web3.utils.fromWei(valueWei, "ether");

      setLastSender(sender);
      setLastValue(valueEth);
      setStatus("ℹ️ Last sender and value fetched.");
    } catch (err: any) {
      console.error(err);
      setStatus("❌ Error fetching data: " + err.message);
    }
  };

  return (
    <div className="grid gap-6 py-6">
      <div className="flex flex-col gap-4">
        <Input
          label="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder="Amount in ETH"
        />
        <div className="grid grid-cols-2 gap-2">
          <Button onClick={sendEther}>Send ETH</Button>
          <Button onClick={fetchLast}>Get Last Info</Button>
        </div>
      </div>

      <div className="p-4 rounded-md border bg-muted space-y-2 text-center font-medium text-indigo-800">
        {status && <div>Status: {status}</div>}
        {lastSender && <div>Last Sender: {lastSender}</div>}
        {lastValue && <div>Last Value: {lastValue} ETH</div>}
      </div>
    </div>
  );
}
