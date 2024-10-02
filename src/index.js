const express = require('express');
const { adicionarPontos, gerarClassificacao } = require('./funcoes');
const path = require('path');  

const app = express();

// configurando o ejs para uso
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 

// arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    const classificacao = gerarClassificacao();
    res.render('classificacao', { classificacao });  // Renderiza a view com dados
});


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

app.get('/status', (req, res) => {
    res.send('OK');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
