'use client';

import { Typewriter } from 'react-simple-typewriter';

const DifferentPrompts = () =>  {
    return <span>
        <Typewriter
          words={
        [
            "Build an ERC20 token dashboard with transfer UI",
            "Build a decentralized voting app using smart contracts.",
            "Create a Web3-based crowdfunding platform like Kickstarter.",
            "Develop a blockchain-based certification verifier.",
            "Design a decentralized blogging platform with content ownership.",
            "Create an NFT ticketing system for events.",
            "Build a Web3 job board that pays in crypto.",
            "Make a DAO for community decision-making.",
            "Create a gasless wallet for onboarding new users.",
            "Design a decentralized ride-sharing dApp.",
            "Build a crypto donation tracker for NGOs.",
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