import React, { useCallback, useEffect, useRef, useState } from "react";

const PasswordGenerator = () => {
  // State for password length, number, and special character options
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // Ref to enable copying the password
  const passwordRef = useRef(null);

  // Function to generate password based on selected options
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

  // Function to copy password to clipboard
  const copyToClipboard = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      window.navigator.clipboard.writeText(password);
    }
  }, [password]);

  // Call passwordGenerator whenever dependencies change
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full h-screen bg-gray-800 flex flex-col items-center p-5 text-white shadow-md ">
      <h1 className="text-3xl text-blue-700 mb-4">Password Generator</h1>
      <div className="flex items-center gap-2 mb-4 ">
        <input
          type="text"
          placeholder="Generated password"
          className="outline-none px-4 py-2 w-80 text-black bg-neutral-100"
          readOnly
          value={password}
          ref={passwordRef}
        />
        <button className="bg-blue-600 text-white px-3 py-2" onClick={copyToClipboard}>
          Copy
        </button>
      </div>
      <div className="flex flex-row gap-3">
        {/* Length slider */}
        <div className="flex items-center gap-2">
          <input
            type="range"
            min={4}
            max={32}
            value={length}
            className="cursor-pointer"
            onChange={(e) => setLength(Number(e.target.value))}
          />
          <span>Length: {length}</span>
        </div>
        {/* Checkbox for special characters */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={charAllowed}
            onChange={() => setCharAllowed((prev) => !prev)}
          />
          <label>Characters</label>
        </div>
        {/* Checkbox for numbers */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={numberAllowed}
            onChange={() => setNumberAllowed((prev) => !prev)}
          />
          <label>Numbers</label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
