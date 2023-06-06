import { useState } from 'react';

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalculat = value => {
    if (
     ( ops.includes(value) && calc === "") ||
     ( ops.includes(value) && ops.includes(calc.slice(-1)))
    ) {
      return;
    }
    setCalc(calc + value);
    /*if (!ops.includes(value)) {
      setResult(eval(calc + value).toString());
    }*/
    if (!ops.includes(value)) {
      try {
        const expression = new Function('return ' + calc + value)();
        setResult(expression.toString());
      } catch (error) {
        // Handle any potential errors during the calculation
        console.error(error);
      }
    }
    
  };

  const createDigits = () => {
    const digits = [];

    for (let i = 1; i < 10; i++) {
      digits.push(
        <button
          onClick={() => updateCalculat(i.toString())}
          key={i}
        >
          {i}
        </button>
      );
    }
    return digits;
  };

  /*const calculate = () => {
    setCalc(eval(calc).toString());
  };*/

  const calculate = () => {
    try {
      const result = new Function('return ' + calc)();
      setCalc(result.toString());
    } catch (error) {
      // Handle any potential errors during the calculation
      console.error(error);
    }
  };
  

  const deleteEntry = () => {
    if (calc === "") {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
  };

  const deleteAll = () => {
    setCalc("");
    setResult("");
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>Result</span> : ""}
          {calc || "0"}
        </div>

        <div className="digits">
          {createDigits()}
          <button className="grid-i" onClick={calculate}>=</button>
        </div>

        <div className="operators">
          <button className="grid-item" onClick={() => updateCalculat("/")}>/</button>
          <button className="grid-item" onClick={() => updateCalculat("*")}>*</button>
          <button className="grid-item" onClick={() => updateCalculat("+")}>+</button>
          <button className="grid-item" onClick={() => updateCalculat("-")}>-</button>
          <button className="grid-item" onClick={deleteEntry}>DEL</button>
          <button className="grid-item" onClick={deleteAll}>C</button>
          <button className="grid-item" onClick={() => updateCalculat("0")}>0</button>
          <button className="grid-item" onClick={() => updateCalculat("00")}>00</button>
        </div>
      </div>
    </div>
  );
}

export default App;