import React, { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  const [length, setLength] = useState(12);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) characters += "0123456789";
    if (charAllowed) characters += "!@#$%^&*(){}[]";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      pass += characters.charAt(randomIndex);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-5">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">Password Generator</h1>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            placeholder="Generated password"
            className="outline-none px-4 py-2 w-full text-black bg-neutral-100 rounded-md"
            readOnly
            value={password}
            ref={passwordRef}
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            onClick={copyToClipboard}
          >
            Copy
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label>Length: {length}</label>
            <input
              type="range"
              min={4}
              max={32}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>
          <div className="flex items-center justify-between">
            <label>Include Special Characters</label>
            <input
              type="checkbox"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
          </div>
          <div className="flex items-center justify-between">
            <label>Include Numbers</label>
            <input
              type="checkbox"
              checked={numberAllowed}
              onChange={() => setNumberAllowed((prev) => !prev)}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;