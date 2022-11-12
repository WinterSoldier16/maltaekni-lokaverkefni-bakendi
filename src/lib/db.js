import pg from 'pg';

const { DATABASE_URL: connectionString, NODE_ENV: nodeEnv = 'development '} = process.env;

if (!connectionString) {
    console.error('Vantar DATABASE_URL í .env');
    process.exit(-1);
}

//const ssl = nodeEnv === 'production' ? { rejectUnauthorized: false } : false;

const pool = new pg.pool({ connectionString });

pool.on('error', (err) => {
    console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
    process.exit(-1);
});

export async function query(q, values = []) {
    const client = await pool.connect();

    let result;

    try {
        result = await client.query(q, values);
    } catch (err) {
        console.error('Villa í query', err);
        throw err;
    } finally {
        client.release();
    }

    return result;
}

export async function end() {
    await pool.end();
}