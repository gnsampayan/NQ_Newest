import express from "express";

const router = express.Router();

export default function(pool) {
  router.get('/:itemName', (req, res) => {
    const { itemName } = req.params;
    const sql = 'SELECT * FROM sales WHERE item_on_sale = ?';

    pool.query(sql, [itemName], (err, results) => {
      if (err) {
        console.error('Error retrieving data:', err);
        res.status(500).json({ error: 'Error retrieving data' });
        return;
      }

      if (results.length > 0) {
        const sale = results[0];
        res.status(200).json({
          itemOnSale: sale.item_on_sale,
          saleDuration: sale.sale_duration,
        });
      } else {
        res.status(404).json({ error: 'Sale not found' });
      }
    });
  });

  return router;
}
