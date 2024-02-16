// allTags.mjs
import express from 'express';

export default function(pool) {
    const router = express.Router();

    router.get('/', (req, res) => {
        const query = 'SELECT tag FROM all_tags';
        pool.query(query, (err, results) => {
            if (err) {
                console.error('Error fetching tags:', err);
                res.status(500).send('Error fetching tags');
            } else {
                console.log('Tags fetched:', results); // Log to debug
                res.json(results); // Send the results
            }
        });
    });

    return router;
}

