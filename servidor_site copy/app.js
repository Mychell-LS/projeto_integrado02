const express = require('express');
const path = require('path');

const app = express();

app.use(express.json());
app.use('/imgs', express.static(path.join(__dirname, 'imgs')));

let Hist = [
    {
        id: 1,
        data: "11/08/2026",
        temperatura: 553.0,
        classificacao: "Boa",
        dilatacao: 0.012719
    }
];

function carregar(res, local) {
    try {
        res.sendFile(local, err => {
            if (err) {
                res.sendFile(
                    path.join(__dirname, 'pags', 'error.html'),
                    erro => {
                        if (erro) {
                            res.status(500);
                            res.setHeader(
                                "Content-Type",
                                "text/plain; charset=utf-8"
                            );
                            res.end(
                                "Erro: Não foi possível fazer conexão ao servidor!"
                            );
                        }
                    }
                );
            }
        });
    } catch {
        res.status(404).sendFile(
            path.join(__dirname, 'pags', 'error.html')
        );
    }
}

app.get('/', (req, res) => {
    carregar(
        res,
        path.join(__dirname, 'pags', 'index.html')
    );
});

app.get('/about', (req, res) => {
    carregar(
        res,
        path.join(__dirname, 'pags', 'about.html')
    );
});

app.get('/historic', (req, res) => {
    carregar(
        res,
        path.join(__dirname, 'pags', 'hist.html')
    );
});

app.get('/hist', (req, res) => {
    res.status(200).json(Hist);
});

app.post('/dados', async (req, res) => {
    const { temperatura } = req.body;

    if (temperatura === undefined || temperatura === null) {
        return res.status(400).json({
            sucesso: false,
            erro: "Temperatura não fornecida."
        });
    }

    const temperaturaNumero = Number(temperatura);

    if (isNaN(temperaturaNumero)) {
        return res.status(400).json({
            sucesso: false,
            erro: "Temperatura inválida."
        });
    }

    const alpha = 23e-6;
    const dilatacao = alpha * temperaturaNumero;

    try {
        const respostaIA = await fetch(
            'http://localhost:5000/classificar',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dilatacao
                })
            }
        );

        if (!respostaIA.ok) {
            throw new Error("A IA retornou um erro.");
        }

        const resultadoIA = await respostaIA.json();

        const novoDado = {
            id: Hist.length + 1,
            data: new Date().toLocaleString('pt-BR'),
            temperatura: temperaturaNumero,
            dilatacao,
            classificacao: resultadoIA.classificacao
        };

        Hist.push(novoDado);

        console.log("Novo dado recebido:", novoDado);

        res.status(201).json({
            sucesso: true,
            mensagem: "Dados recebidos e classificados com sucesso.",
            dado: novoDado
        });
    } catch (erro) {
        console.error(
            "Erro ao comunicar com a IA:",
            erro
        );

        res.status(500).json({
            sucesso: false,
            erro: "Não foi possível comunicar com a IA."
        });
    }
});

app.use((req, res) => {
    carregar(
        res,
        path.join(__dirname, 'pags', 'error.html')
    );
});

app.listen(3000, '0.0.0.0', () => {
    console.log(
        'Servidor rodando em http://localhost:3000'
    );
});