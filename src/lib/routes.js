import { query } from './db.js';

export async function getGuess({ lyricsID, guess } = {}) {
    const q = `
        INSERT INTO guesses
            (LYRICS_ID, GUESS)
        VALUES
            ($1, $2)
        RETURNING LYRICS_ID, GUESS;
    `;

    const values = [lyricsID, guess];

    const result = await query(q, values)

    if (result && result.rowCount === 1) {
        return result.rows[0];
    }

    return null;
}

