const { Table } = require("react-bootstrap");

const Grid = (props) => {
  const { values } = props;
  return (
    <Table>
      <thead>
        <tr>
          <th>Posição</th>
          <th>Jogador</th>
          <th>Movimentos</th>
          <th>Tempo</th>
        </tr>
      </thead>
      <tbody>
        {values &&
          values.map((item, i) => (
            <tr key={i}>
              <th>{i + 1}</th>
              <td>{item.name}</td>
              <td>{item.moves}</td>
              <td>{item.time}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  );
};

export default Grid;
