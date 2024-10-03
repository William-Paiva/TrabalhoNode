const express = require('express');
const { adicionarPontos, gerarClassificacao } = require('./funcoes');
const { z } = require('zod');  
const path = require('path');

const app = express();

// configurando o ejs para uso
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// arquivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// usando Zod para validar a equipe e pontos
const lancamentoSchema = z.object({
    equipe: z.enum(['TimeA', 'TimeB', 'TimeC']), 
    pontos: z.number().int().min(1).max(3),      
});

app.post('/lancamento', (req, res) => {
    const { equipe, pontos } = req.body;

    try {
        const parsedData = lancamentoSchema.parse({
            equipe,
            pontos: parseInt(pontos),  
        });

        adicionarPontos(parsedData.equipe, parsedData.pontos);
        res.redirect('/');

    } catch (err) {
        console.error('Erro de validação:', err.errors);
        res.status(400).send('Dados inválidos. Verifique o time e os pontos.');
    }
});


app.get('/', (req, res) => {
    const classificacao = gerarClassificacao();
    res.render('classificacao', { classificacao });
});

app.get('/status', (req, res) => {
    res.send('OK');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
