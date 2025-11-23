const express = require('express');
const router = express.Router();
const db = require('../database');

// Criar grupo
router.post('/', (req, res) => {
  const { nome, sistema_id } = req.body;

  const query = `
    INSERT INTO grupo (nome, sistema_id)
    VALUES (?, ?)
  `;

  db.run(query, [nome, sistema_id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.status(201).json({
      id: this.lastID,
      nome,
      sistema_id
    });
  });
});

// Listar todos os grupos
router.get('/', (req, res) => {
  const query = `
    SELECT g.*, s.nome AS sistema
    FROM grupo g
    LEFT JOIN sistema s ON g.sistema_id = s.id
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });

    res.json(rows);
  });
});

// Buscar grupo por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM grupo WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (!row) return res.status(404).json({ mensagem: "Grupo não encontrado" });

    res.json(row);
  });
});

// Atualizar grupo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, sistema_id } = req.body;

  const query = `
    UPDATE grupo
    SET nome = ?, sistema_id = ?
    WHERE id = ?
  `;

  db.run(query, [nome, sistema_id, id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.json({ mensagem: "Grupo atualizado com sucesso" });
  });
});

// Deletar grupo
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM grupo WHERE id = ?`, [id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.json({ mensagem: "Grupo removido com sucesso" });
  });
});


// ✅ Vincular permissão a um grupo
router.post('/:grupo_id/permissoes/:permissao_id', (req, res) => {
  const { grupo_id, permissao_id } = req.params;

  const query = `
    INSERT INTO grupo_permissao (grupo_id, permissao_id)
    VALUES (?, ?)
  `;

  db.run(query, [grupo_id, permissao_id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.json({ mensagem: "Permissão vinculada ao grupo" });
  });
});

module.exports = router;
