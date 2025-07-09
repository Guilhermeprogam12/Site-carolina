exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { nome_aluno, email, senha } = JSON.parse(event.body);

        if (!nome_aluno || !email || !senha) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Todos os campos são obrigatórios.' }) };
        }

        const apiKey = process.env.AIRTABLE_API_KEY;
        const baseId = process.env.AIRTABLE_BASE_ID;
        const url = `https://api.airtable.com/v0/${baseId}/Alunos`;

        const airtableData = {
            fields: {
                "nome_aluno": nome_aluno,
                "email": email,
                "senha": senha,
                "status": "Ativo" // Todo novo aluno começa como Ativo
            }
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(airtableData)
        });

        if (!response.ok) {
            throw new Error('Falha ao salvar o novo aluno no Airtable.');
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'Aluno adicionado com sucesso!' })
        };

    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ocorreu um erro no servidor.' })
        };
    }
};
