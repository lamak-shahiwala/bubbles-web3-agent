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
    "frontend.jsx": `export default function App() { return <div>Hello</div>; }`
  });
}
