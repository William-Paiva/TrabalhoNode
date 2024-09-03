const fs = require('fs');

const filePath = path.join(__dirname, 'pontuacao.json');

function adicionarPontos(equipe, pontos) {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const pontuacao = JSON.parse(data);

        if (pontuacao[equipe]) {
            pontuacao[equipe] += pontos;
        } else {
            pontuacao[equipe] = pontos;
        }

        fs.writeFileSync(filePath, JSON.stringify(pontuacao, null, 2), 'utf8');
    } catch (err) {
        console.error('Erro ao adicionar pontos:', err);
    }
}

function gerarClassificacao() {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const pontuacao = JSON.parse(data);

        const classificacao = Object.keys(pontuacao)
            .map(equipe => ({ equipe, pontuacao: pontuacao[equipe] }))
            .sort((a, b) => b.pontuacao - a.pontuacao);

        return classificacao;
    } catch (err) {
        console.error('Erro ao gerar classificação:', err);
        return [];
    }
}

module.exports = { adicionarPontos, gerarClassificacao };
