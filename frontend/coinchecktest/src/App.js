import "./App.css";
import React, { useState } from "react";

export default function App() {
  const [checkedItems, setCheckedItems] = useState({
    0.01: false,
    0.05: false,
    0.1: false,
    0.2: false,
    0.5: false,
    1: false,
    2: false,
    5: false,
    10: false,
    50: false,
    100: false,
    1000: false,
  });

  const [targetamount, setAmountInput] = useState("");
  const [Message, setMessage] = useState("");

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [name]: checked,
    }));
  };

  const handleTargetAmountInputChange = (event) => {
    setAmountInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!targetamount || isNaN(targetamount)) {
      setMessage("Please enter a valid number for the target amount.");
      return;
    }

    const coindenominations = Object.keys(checkedItems).filter(
      (key) => checkedItems[key]
    );

    if (coindenominations.length === 0) {
      setMessage("Please select at least one denomination.");
      return;
    }

    try {
      const response = await fetch("http://52.77.253.238:8080/api/coin/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ targetamount, coindenominations }),
      });
      const text = await response.text();
      if (response.ok) {
        setMessage(text);
      } else {
        setMessage(text);
      }
    } catch (error) {
      console.error("Error sending data:", error);
      setMessage("An error occurred while sending data.");
    }
  };

  return (
    <form onSubmit={handleSubmit} class="App-form">
      <h3 class="App-heading">Coin Check</h3>
      <div className="App-numberInputContainer">
        <label htmlFor="numberInput" className="App-numberInputLabel">
          Enter a Number:
        </label>
        <input
          type="number"
          id="numberInput"
          value={targetamount}
          onChange={handleTargetAmountInputChange}
          className="App-numberInput"
        />
      </div>

      <div class="App-checkboxContainer">
        {Object.keys(checkedItems)
          .map(Number)
          .sort((a, b) => a - b)
          .map((key) => (
            <label key={key} class="App-checkboxLabel">
              <input
                type="checkbox"
                name={key}
                checked={checkedItems[key]}
                onChange={handleCheckboxChange}
                class="App-checkbox"
              />
              {key}
            </label>
          ))}
      </div>
      <button type="submit" class="App-button">
        Check
      </button>
      {Message && <p className="App-Message">{Message}</p>}
    </form>
  );
}
