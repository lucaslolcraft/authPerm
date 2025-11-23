const express = require('express');
const router = express.Router();
const db = require('../database');

// Criar usuário
router.post('/', (req, res) => {
  const { nome, email } = req.body;

  const query = `
    INSERT INTO usuario (nome, email)
    VALUES (?, ?)
  `;

  db.run(query, [nome, email], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.status(201).json({
      id: this.lastID,
      nome,
      email
    });
  });
});

// Listar usuários
router.get('/', (req, res) => {
  const query = `
    SELECT * FROM usuario
  `;

  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ erro: err.message });

    res.json(rows);
  });
});

// Buscar usuário por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get(`SELECT * FROM usuario WHERE id = ?`, [id], (err, row) => {
    if (err) return res.status(500).json({ erro: err.message });

    if (!row) return res.status(404).json({ mensagem: "Usuário não encontrado" });

    res.json(row);
  });
});

// Atualizar usuário
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email } = req.body;

  const query = `
    UPDATE usuario
    SET nome = ?, email = ?
    WHERE id = ?
  `;

  db.run(query, [nome, email, id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.json({ mensagem: "Usuário atualizado com sucesso" });
  });
});

// Deletar usuário
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM usuario WHERE id = ?`, [id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.json({ mensagem: "Usuário removido com sucesso" });
  });
});

// ✅ Vincular usuário a grupo
router.post('/:usuario_id/grupos/:grupo_id', (req, res) => {
  const { usuario_id, grupo_id } = req.params;

  const query = `
    INSERT INTO usuario_grupo (usuario_id, grupo_id)
    VALUES (?, ?)
  `;

  db.run(query, [usuario_id, grupo_id], function(err) {
    if (err) return res.status(500).json({ erro: err.message });

    res.json({ mensagem: "Usuário vinculado ao grupo" });
  });
});

module.exports = router;
