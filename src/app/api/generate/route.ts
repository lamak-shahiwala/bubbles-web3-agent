import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();

  return NextResponse.json({
    "contract.sol": `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleToken {
  string public name = "SimpleToken";
  mapping(address => uint256) public balances;

  function mint() public {
    balances[msg.sender] += 100;
  }
}`,
    "frontend.jsx": `
import { useState } from "react";

export default function App() {
  const [wallet, setWallet] = useState("");

  return (
    <div className="p-4">
      <h1>Simple Token DApp</h1>
      <button onClick={() => alert('Minted!')}>Mint Token</button>
    </div>
  );
}
`,
  });
}
