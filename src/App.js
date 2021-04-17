import './App.css';
import TopBar from './components/TopBar';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [complemento, setComplemento] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  function submitCep() {
    if (isNaN(Number(cep)) || cep.length !== 8) {
      setError(true);
      setErrorMsg('CEP invalido, certifique-se que o CEP informado só possui exatamente 8 números.')
      return;
    }
    setLoading(true);
    axios.get(`http://viacep.com.br/ws/${cep}/json/`)
      .then(function (response) {
        setLoading(false);
        if (response.data.erro) {
          setError(true);
          setErrorMsg('CEP inexistente.');
          return;
        }
        setError(false);
        setErrorMsg('');
        setLogradouro(response.data.logradouro);
        setComplemento(response.data.complemento);
        setBairro(response.data.bairro);
        setLocalidade(response.data.localidade);
        setUf(response.data.uf);
      })
      .catch(function (error) {
        setLoading(false);
        setError(true);
        setErrorMsg('Problema no servidor dos Correios.')
      })
  }

  return (
    <div className="App">

      <TopBar />

      <div className="container">

        <Typography variant="h6">Consultar um CEP</Typography>
        <TextField id="outlined-basic" label="CEP" variant="outlined" value={cep} onChange={(event) => setCep(event.target.value)} />
        <Button variant="contained" color="primary" className="submit-btn" onClick={() => submitCep()}>
          Buscar
        </Button>

        {!error && !loading &&
          <div className="response-data">
            <Typography variant="h6">Logradouro: {logradouro}</Typography>
            <Typography variant="h6">Complemento: {complemento}</Typography>
            <Typography variant="h6">Bairro: {bairro}</Typography>
            <Typography variant="h6">Localidade: {localidade}</Typography>
            <Typography variant="h6">UF: {uf}</Typography>
          </div>
        }

        {error && !loading &&
          <div className="response-data">
            <Typography variant="h6">Erro ao identificar esse CEP</Typography>
            <Typography variant="h6">{errorMsg}</Typography>
          </div>
        }

        {loading &&
          <div className="response-data">
            <CircularProgress/>
          </div>
        }

      </div>

    </div>
  );
}

export default App;
