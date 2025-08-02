# Bubbles - Web3 Agent

This project is built using Nextjs, typescript and tailwindcss 3.4.1
It allows user to generate a web3app boilerplate code for:

- frontend (react based)
- contract (solidity contract (ERC20, ERC721, etc..))
- backend and server logic
- full project structure

## How it works?

- User enters prompt in natural language
- qwen/qwen3-235b-a22b generates the code in json format and returns it
- the code is shown to the user on result page with monaco code editor
- the live preview is shown using SandpackPreview (you can also use SandpackEditor to see live code changes)
- user can give a follow up prompt to agent and get updated codebase
- atlast user can download the project structure as a .zip

## Dependencies

- "@codesandbox/sandpack-react": "^2.20.0",
- "@monaco-editor/react": "^4.7.0",
- "autoprefixer": "^10.4.21",
- "jszip": "^3.10.1",
- "next": "15.3.4",
- "openai": "^5.7.0",
- "postcss": "^8.5.6",
- "react": "^19.0.0",
- "react-arborist": "^3.4.3",
- "react-dom": "^19.0.0",
- "react-icons": "^5.5.0",
- "react-live": "^4.1.8", [this was used before using sandpack preview]
- "react-simple-typewriter": "^5.0.1"

## How to run on local machine??

- clone the project
- run : npm install
- make sure all the dependencies are there
- create an qwen/qwen3-235b-a22b (free) api key from https://openrouter.ai/
- create ".env.local" file on root folder and just create a variable OPENAI_API_KEY = {Your Key Here} or you can directly paste your key in route.ts file located at src\app\api\generate\route.ts
- after performing above steps you are good to go just run: npm run dev

## Future Plans

- improve system prompt!!
- deploying contracts to testnet
- database connection to store the change

## Thankyou for showing interest
