const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/', (req, res) => {
  const { nome, descricao } = req.body;

  const query = `
    INSERT INTO sistema (nome, descricao)
    VALUES (?, ?)
  `;

  db.run(query, [nome, descricao], function(err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      nome,
      descricao
    });
  });
});

router.get('/', (req, res) => {
  const query = `SELECT * FROM sistema`;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json(rows);
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  const query = `SELECT * FROM sistema WHERE id = ?`;

  db.get(query, [id], (err, row) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (!row) {
      return res.status(404).json({ mensagem: "Sistema não encontrado" });
    }

    res.json(row);
  });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao } = req.body;

  const query = `
    UPDATE sistema
    SET nome = ?, descricao = ?
    WHERE id = ?
  `;

  db.run(query, [nome, descricao, id], function(err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Sistema atualizado com sucesso" });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM sistema WHERE id = ?`;

  db.run(query, [id], function(err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json({ mensagem: "Sistema removido com sucesso" });
  });
});

module.exports = router;
