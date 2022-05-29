import React from "react";
import { useState } from "react";
import "./App.css";

const getWinner = function (squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c])
      return squares[a];
  }
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) return null;
  }
  return -1;
};

const Square = function (props) {
  return (
    <button className="square" id={props.id} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

const Game = function () {
  const [value, setValue] = useState("X");
  const [squareValue, setSquareValue] = useState(Array(9).fill(null));

  let rows = [];
  let squareStatus = squareValue.slice();
  for (let i = 0; i < 3; i++) {
    let squares = [];
    for (let j = 0; j < 3; j++) {
      squares[j] = (
        <Square
          key={String(i * 3 + j)}
          id={String(i * 3 + j)}
          value={squareValue[i * 3 + j]}
          onClick={() => {
            if (squareValue[i * 3 + j] !== null || getWinner(squareValue))
              return;
            squareStatus[i * 3 + j] = value;
            setSquareValue(squareStatus);
            setValue(value === "X" ? "O" : "X");
          }}
        />
      );
    }
    rows[i] = (
      <div key={String(i)} className="board-row" id={String(i)}>
        {squares}
      </div>
    );
  }

  let status = "Next player : " + String(value);
  let winner = getWinner(squareValue);
  if (winner) {
    status = "Winner : " + getWinner(squareValue);
    if (winner === -1) status = "Game Draw!";
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">{rows}</div>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <div className="App-content">
        <Game />
      </div>
    );
  }
}

export default App;
