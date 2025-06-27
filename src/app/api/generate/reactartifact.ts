/*
// Example artifact

export const basePrompt = `
// Example base prompt to demonstrate file structure and code formatting.
// This is for internal model understanding ONLY. Output must be JSON as per system prompt.

{
  "/package.json": "{\\n  \\"name\\": \\"react-tailwind-jsx-sandpack\\",\\n  \\"version\\": \\"1.0.0\\",\\n  \\"private\\": true,\\n  \\"scripts\\": {\\n    \\"dev\\": \\"vite\\",\\n    \\"build\\": \\"vite build\\",\\n    \\"preview\\": \\"vite preview\\"\\n  },\\n  \\"dependencies\\": {\\n    \\"react\\": \\"^18.2.0\\",\\n    \\"react-dom\\": \\"^18.2.0\\"\\n  },\\n  \\"devDependencies\\": {\\n    \\"@vitejs/plugin-react\\": \\"^4.3.1\\",\\n    \\"autoprefixer\\": \\"^10.4.14\\",\\n    \\"postcss\\": \\"^8.4.24\\",\\n    \\"tailwindcss\\": \\"^3.4.1\\",\\n    \\"vite\\": \\"^5.4.2\\"\\n  }\\n}",
  
  "/tsconfig.json": "{\\n  \\"compilerOptions\\": {\\n    \\"target\\": \\"esnext\\",\\n    \\"module\\": \\"esnext\\",\\n    \\"jsx\\": \\"react-jsx\\",\\n    \\"moduleResolution\\": \\"node\\",\\n    \\"strict\\": true,\\n    \\"esModuleInterop\\": true\\n  },\\n  \\"include\\": [\\"src\\"],\\n  \\"exclude\\": [\\"node_modules\\"]\\n}",

  "/tailwind.config.js": "export default {\\n  content: [\\"./src/**//*.{js,jsx}\\"],\\n  theme: { extend: {} },\\n  plugins: []\\n};",
  
  "/README.md": "# React Tailwind JSX Sandpack\\nThis project demonstrates a React app using Tailwind CSS and JSX in Sandpack.",
  
  "/src/index.jsx": "import React from 'react';\\nimport ReactDOM from 'react-dom/client';\\nimport App from './App.jsx';\\nimport './index.css';\\n\\nReactDOM.createRoot(document.getElementById('root')).render(\\n  <React.StrictMode>\\n    <App />\\n  </React.StrictMode>\\n);",
  
  "/src/App.jsx": "import React from 'react';\\n\\nexport default function App() {\\n  return (\\n    <div className=\\"min-h-screen flex items-center justify-center bg-gray-100\\">\\n      <h1 className=\\"text-3xl font-bold text-blue-600\\">Hello from React + Tailwind + JSX!</h1>\\n    </div>\\n  );\\n}",
  
  "/src/components/Button.jsx": "import React from 'react';\\nexport default function Button({ label }) {\\n  return (\\n    <button className=\\"px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600\\">\\n      {label}\\n    </button>\\n  );\\n}",
  
  "/src/index.css": "@tailwind base;\\n@tailwind components;\\n@tailwind utilities;",
  
  "/contracts/SimpleStorage.sol": "// SPDX-License-Identifier: MIT\\npragma solidity ^0.8.19;\\n\\ncontract SimpleStorage {\\n  uint256 private value;\\n\\n  function set(uint256 _value) public {\\n    value = _value;\\n  }\\n\\n  function get() public view returns (uint256) {\\n    return value;\\n  }\\n}",
  
  "/backend/server.js": "import express from 'express';\\nconst app = express();\\napp.get('/api', (req, res) => {\\n  res.json({ message: 'Hello from backend!' });\\n});\\nexport default app;"
}
`;
*/