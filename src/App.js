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
      return [squares[a], lines[i]];
  }
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) return null;
  }
  return -1;
};

const Square = function (props) {
  return (
    <button
      className={"square" + props.winStatus}
      id={props.id}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
};

const Game = function () {
  const [value, setValue] = useState("X");
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null), win: [null, null, null] },
  ]);
  const [squareValue, setSquareValue] = useState(Array(9).fill(null));
  const [maxSteps, setMaxSteps] = useState(0);
  const [current, setCurrent] = useState(0);
  const [win, setWin] = useState([null, null, null]);

  let rows = [];
  let squareStatus = squareValue.slice();

  for (let i = 0; i < 3; i++) {
    let squares = [];
    for (let j = 0; j < 3; j++) {
      let winStatus = "";
      if (win.includes(3 * i + j)) winStatus = " win";
      squares[j] = (
        <Square
          winStatus={winStatus}
          key={String(i * 3 + j)}
          id={String(i * 3 + j)}
          value={squareStatus[i * 3 + j]}
          onClick={() => {
            if (squareStatus[i * 3 + j] !== null || getWinner(squareStatus))
              return;
            squareStatus[i * 3 + j] = value;

            setCurrent(current + 1);
            setMaxSteps(current + 1);

            let tmpWin = getWinner(squareStatus);
            if (tmpWin && tmpWin !== -1) {
              tmpWin = tmpWin[1];
            } else {
              tmpWin = [null, null, null];
            }

            setWin(tmpWin);

            let tmpHistory = history;
            tmpHistory[current + 1] = { squares: squareStatus, win: tmpWin };
            setHistory(tmpHistory);

            setSquareValue(squareStatus);

            setValue(current & 1 ? "X" : "O");
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

  let list = [];
  let status = "Game start";
  for (let i = 0; i <= maxSteps; i++) {
    list[i] = (
      <li key={String(i)} id={String(i)}>
        <button
          className="step"
          onClick={() => {
            setCurrent(i);
            setSquareValue(history[i].squares);
            setWin(history[i].win);
            setValue(i & 1 ? "O" : "X");
          }}
        >
          {status}
        </button>
      </li>
    );
    status = "Go to step " + String(i + 1);
  }

  status = "Next player : " + String(value);
  let winner = getWinner(squareStatus);
  if (winner) {
    if (winner === -1) status = "Game Draw!";
    else {
      status = "Winner : " + winner[0];
    }
  }

  return (
    <div className="game">
      <div className="status">{status}</div>
      <div className="board">{rows}</div>
      <div className="time-travel">
        <ol>{list}</ol>
      </div>
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
