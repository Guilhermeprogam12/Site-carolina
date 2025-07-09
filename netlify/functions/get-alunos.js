exports.handler = async function(event) {
    const { table } = event.queryStringParameters;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const url = `https://api.airtable.com/v0/${baseId}/${table}`;

    try {
        const response = await fetch(url, { headers: { 'Authorization': `Bearer ${apiKey}` } });
        if (!response.ok) throw new Error('Falha na resposta do Airtable.');
        const data = await response.json();
        return { statusCode: 200, body: JSON.stringify(data.records) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
