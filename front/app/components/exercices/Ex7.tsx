import { useState } from "react";
import RectangleABI from "../../abis/Rectangle.json";
import { useContract } from "../../hooks/useContract";
import { NETWORK_ID } from "app/lib/constants";
import { Button } from "../ui/button";

export default function Rectangle() {
  const { contract, isLoading } = useContract(
    RectangleABI.abi,
    RectangleABI.networks[NETWORK_ID].address,
  );

  const [areaResult, setAreaResult] = useState<number | null>(null);

  if (isLoading) return <span>Loading...</span>;

  const fetchArea = async () => {
    try {
      const area = await contract.methods.area().call();
      setAreaResult(area);
    } catch (err: any) {
      console.error(err);
      setAreaResult(null);
    }
  };

  return (
    <div className="grid gap-6 py-6">
      <div className="flex justify-start">
        <Button onClick={fetchArea}>Get Rectangle Area</Button>
      </div>

      <div className="p-4 rounded-md border bg-muted text-center font-semibold text-indigo-700">
        {areaResult !== null
          ? `Rectangle Area: ${areaResult}`
          : "Click the button to get the area"}
      </div>
    </div>
  );
}
