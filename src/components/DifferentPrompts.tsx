'use client';

import { Typewriter } from 'react-simple-typewriter';

const DifferentPrompts = () =>  {
    return <span>
        <Typewriter
          words={
        [
            "Build an ERC20 token dashboard with transfer UI",
            "Create an NFT mining UI with an ERC721",
            "Build a dashboard that shows ETH balance and allow transfers",
            "Generate a staking contract and UI to lock tokens for 30 days",
        ]
          }
          loop={true}
          cursor={true}
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1800}
        />
    </span>
}

export default DifferentPrompts;