exports.handler = async function(event, context) {
    try {
        const apiKey = process.env.AIRTABLE_API_KEY;
        const baseId = process.env.AIRTABLE_BASE_ID;
        const url = `https://api.airtable.com/v0/${baseId}/Alunos`;

        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${apiKey}` }
        });

        if (!response.ok) {
            throw new Error('Falha ao buscar dados dos alunos no Airtable.');
        }
        
        const data = await response.json();

        return {
            statusCode: 200,
            body: JSON.stringify(data.records) // Envia apenas a lista de registros
        };
    } catch (error) {
        console.error('Erro na função get-alunos:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ocorreu um erro no servidor.' })
        };
    }
};