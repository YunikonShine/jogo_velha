import "./Game.css";
import { useState } from "react";
import PropTypes from "prop-types";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";

const Game = (props) => {
  let tempTimer = 0;
  const [timer, setTimer] = useState(0);
  const [start, setStart] = useState(true);
  const [positions, setPositions] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ]);
  const [isCross, setCross] = useState(true);
  const [status, setStatus] = useState("");

  const draw = () => {
    let tempPosition = positions;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (tempPosition[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  };

  const verifyVictory = () => {
    const victoryConditions = [
      [0, 1, 2],
      [0, 4, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8],
    ];

    let value = isCross ? "X" : "O";
    let index = -1;
    let tempPosition = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        index++;
        if (positions[i][j] == value) {
          tempPosition.push(index);
        }
      }
    }

    victoryConditions.forEach((condition) => {
      if (checker(tempPosition, condition)) {
        if (isCross) {
          Axios.get("http://www.localhost:3001/games").then((response) => {
            Axios.post("http://www.localhost:3001/games", {
              id: response.data[response.data.length - 1].id + 1,
              name: "Vinicius",
              moves: 6,
              time: tempTimer,
            }).then(() => {
              this.props.history.push("/");
            });
          });
        } else {
          alert("DERROTA");
        }
      }
    });

    return null;
  };

  let checker = (arr, target) => target.every((v) => arr.includes(v));

  const randomPlay = () => {
    let ok = false;
    do {
      let x = random();
      let y = random();
      if (positions[x][y] === "") {
        let tempPosition = positions;
        tempPosition[x][y] = "O";
        setPositions(tempPosition);
        setCross(true);
        ok = true;
      }
    } while (!ok);
    verifyVictory();
  };

  const random = () => {
    return parseInt(Math.random() * (3 - 0) + 0);
  };

  const action = (a, b) => {
    if (start) {
      counter();
      setStart(false);
    }
    if (positions[a][b] === "") {
      let tempPosition = positions;
      tempPosition[a][b] = isCross ? "X" : "O";
      setPositions(tempPosition);
      setCross(false);
      verifyVictory();
      setTimeout(function () {
        randomPlay();
      }, 2000);
    }
  };

  const counter = () => {
    setInterval(() => {
      setTimer(++tempTimer);
    }, 1000);
  };

  const complete = (val) => {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  };

  const getPosition = (a, b) => {
    return positions[a][b];
  };

  return (
    <Container>
      <Row className="mt-3">
        <Link to="/">
          <span>Voltar para a página principal</span>
        </Link>
      </Row>
      <div className="d-flex justify-content-center mb-5">
        <h1>Partida</h1>
      </div>
      <div className="d-flex">
        <div className="your-turn d-flex justify-content-center flex-column">
          {isCross && <h2>É a sua vez</h2>}
        </div>
        <div className="d-flex justify-content-center table m-0">
          <div className="backgroud-game d-flex">
            <Row className="m-0">
              <Button
                variant="secondary"
                className="button-game"
                onClick={() => action(0, 0)}
              >
                {getPosition(0, 0)}
              </Button>
              <Button
                variant="secondary"
                className="button-game"
                onClick={() => action(1, 0)}
              >
                {getPosition(1, 0)}
              </Button>
              <Button
                variant="secondary"
                className="last-button"
                onClick={() => action(2, 0)}
              >
                {getPosition(2, 0)}
              </Button>
            </Row>
            <Row className="m-0">
              <Button
                variant="secondary"
                className="button-game"
                onClick={() => action(0, 1)}
              >
                {getPosition(0, 1)}
              </Button>
              <Button
                variant="secondary"
                className="button-game"
                onClick={() => action(1, 1)}
              >
                {getPosition(1, 1)}
              </Button>
              <Button
                variant="secondary"
                className="last-button"
                onClick={() => action(2, 1)}
              >
                {getPosition(2, 1)}
              </Button>
            </Row>
            <Row className="m-0">
              <Button
                variant="secondary"
                className="button-game"
                onClick={() => action(0, 2)}
              >
                {getPosition(0, 2)}
              </Button>
              <Button
                variant="secondary"
                className="button-game"
                onClick={() => action(1, 2)}
              >
                {getPosition(1, 2)}
              </Button>
              <Button
                variant="secondary"
                className="last-button"
                onClick={() => action(2, 2)}
              >
                {getPosition(2, 2)}
              </Button>
            </Row>
          </div>
        </div>
        <div className="d-flex flex-column machine-turn justify-content-center">
          {!isCross && (
            <>
              <h2>É a vez do computador</h2>
              <span>O computador está fazendo alguma jogada aleatória</span>
            </>
          )}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-3">
        <h2>{complete(parseInt(timer / 60))}</h2>
        <h2>:</h2>
        <h2>{complete(timer % 60)}</h2>
      </div>
    </Container>
  );
};

export default withRouter(Game);
