const express = require('express');
const router = express.Router();
const db = require('../database');

// Criar permissão
router.post('/', (req, res) => {
  const { nome, descricao, sistema_id } = req.body;

  const query = `
    INSERT INTO permissao (nome, descricao, sistema_id)
    VALUES (?, ?, ?)
  `;

  db.run(query, [nome, descricao, sistema_id], function(err) {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.status(201).json({
      id: this.lastID,
      nome,
      descricao,
      sistema_id
    });
  });
});

// Listar todas as permissões
router.get('/', (req, res) => {
  const query = `
    SELECT p.*, s.nome AS sistema
    FROM permissao p
    LEFT JOIN sistema s ON p.sistema_id = s.id
  `;

  db.all(query, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json(rows);
  });
});

// Buscar permissão por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM permissao WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (!row) {
      return res.status(404).json({ mensagem: "Permissão não encontrada" });
    }

    res.json(row);
  });
});

// Atualizar permissão
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, sistema_id } = req.body;

  const query = `
    UPDATE permissao
    SET nome = ?, descricao = ?, sistema_id = ?
    WHERE id = ?
  `;

  db.run(query, [nome, descricao, sistema_id, id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.json({ mensagem: "Permissão atualizada com sucesso" });
  });
});

// Deletar permissão
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM permissao WHERE id = ?`, [id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.json({ mensagem: "Permissão removida com sucesso" });
  });
});

module.exports = router;
