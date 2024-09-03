const express = require('express');
const { adicionarPontos, gerarClassificacao } = require('./funcoes');

const app = express();
app.use(express.urlencoded({ extended: true }));

// Rota 1: Quadro de classificação
app.get('/', (req, res) => {
    const classificacao = gerarClassificacao();
    res.json(classificacao);
});

// Rota 2: Formulário de lançamento
app.get('/lancamento', (req, res) => {
    const formHtml = `
        <form action="/lancamento" method="post">
            <label for="equipe">Equipe:</label>
            <select name="equipe" id="equipe">
                <option value="TimeA">Time A</option>
                <option value="TimeB">Time B</option>
                <option value="TimeC">Time C</option>
            </select>
            <label for="pontos">Pontos:</label>
            <select name="pontos" id="pontos">
                <option value="1">1</option>
                <option value="3">3</option>
            </select>
            <button type="submit">Lançar</button>
        </form>
    `;
    res.send(formHtml);
});

app.post('/lancamento', (req, res) => {
    const { equipe, pontos } = req.body;
    adicionarPontos(equipe, parseInt(pontos));
    res.redirect('/');
});

// Rota 3: Verificação de status
app.get('/status', (req, res) => {
    res.send('OK');
});

// Configurando o servidor para escutar na porta 3000
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
