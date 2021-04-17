import './App.css';
import TopBar from './components/TopBar';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



function App() {
  return (
    <div className="App">

      <TopBar />

      <div className="container">

        <Typography variant="h6">Consultar um CEP</Typography>
        <TextField id="outlined-basic" label="CEP" variant="outlined" />
        <Button variant="contained" color="primary" className="submit-btn">
          Buscar
      </Button>

      <div className="response-data">
        <Typography variant="h6">Logradouro:</Typography>
        <Typography variant="h6">Complemento:</Typography>
        <Typography variant="h6">Bairro:</Typography>
        <Typography variant="h6">Localidade:</Typography>
        <Typography variant="h6">UF:</Typography>
      </div>

      </div>

    </div>
  );
}

export default App;
