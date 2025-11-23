const express = require('express');
const router = express.Router();
const db = require('../database');

router.get('/permissoes/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const query = `
  SELECT DISTINCT p.nome, p.descricao, s.nome AS sistema
  FROM usuario u
  JOIN usuario_grupo ug ON u.id = ug.usuario_id
  JOIN grupo g ON ug.grupo_id = g.id
  JOIN grupo_permissao gp ON g.id = gp.grupo_id
  JOIN permissao p ON gp.permissao_id = p.id
  JOIN sistema s ON p.sistema_id = s.id
  WHERE u.id = ?;
  `;

  db.all(query, [usuario_id], (err, rows) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    res.json({
      usuario_id,
      permissoes: rows
    });
  });
});

router.get('/protegido/relatorio-financeiro/:usuario_id', (req, res) => {
  const { usuario_id } = req.params;

  const query = `
  SELECT p.nome
  FROM usuario u
  JOIN usuario_grupo ug ON u.id = ug.usuario_id
  JOIN grupo g ON ug.grupo_id = g.id
  JOIN grupo_permissao gp ON g.id = gp.grupo_id
  JOIN permissao p ON gp.permissao_id = p.id
  WHERE u.id = ? AND p.nome = 'VER_RELATORIO'
  `;

  db.get(query, [usuario_id], (err, row) => {
    if (err) {
      return res.status(500).json({ erro: err.message });
    }

    if (!row) {
      return res.status(403).json({
        mensagem: "Acesso negado: você não tem a permissão VER_RELATORIO"
      });
    }

    res.json({
      mensagem: "Acesso liberado! Aqui está o relatório financeiro"
    });
  });
});


module.exports = router;
