import { useState, useEffect } from "react";
import "./Ranking.css";
import { Button, Container, Row } from "react-bootstrap";
import Grid from "../../components/grid/Grid";
import Axios from "axios";
import { Link } from "react-router-dom";

const Ranking = () => {
  useEffect(() => {
    getRanking();
  }, []);

  const [items, setItems] = useState([]);

  const orderRankingList = (a, b) => {
    if (a.time > b.time) {
      return 1;
    } else if (b.time > a.time) {
      return -1;
    } else if (a.moves > b.moves) {
      return 1;
    } else if (b.moves > a.moves) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    }
    return 0;
  };

  const getRanking = () => {
    Axios.get("http://www.localhost:3001/games").then((response) => {
      setItems(response.data.sort(orderRankingList).slice(0, 10));
    });
  };

  return (
    <Container>
      <Row className="d-flex flex-row-reverse mt-3">
        <a href="https://github.com/YunikonShine" target="_blank">
          Visitar GitHub do desenvolvedor
        </a>
      </Row>
      <Row className="d-flex justify-content-center mt-5 mb-5">
        <h1>Bem vindo ao jogo da velha</h1>
      </Row>
      <Row className="mb-3">
        <h2>Ranking</h2>
      </Row>
      <Row>
        <Grid values={items}></Grid>
      </Row>
      <Row>
        <span>Mostrando os 10 primeiros do ranking</span>
      </Row>
      <Row className="d-flex justify-content-center mt-5">
        <Link to="/game">
          <Button className="button-size">Jogar</Button>
        </Link>
      </Row>
    </Container>
  );
};

export default Ranking;
