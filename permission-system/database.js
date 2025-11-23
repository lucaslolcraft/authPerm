const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS sistema (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS permissao (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT,
    sistema_id INTEGER,
    FOREIGN KEY (sistema_id) REFERENCES sistema(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS grupo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    sistema_id INTEGER,
    FOREIGN KEY (sistema_id) REFERENCES sistema(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS grupo_permissao (
    grupo_id INTEGER,
    permissao_id INTEGER,
    FOREIGN KEY (grupo_id) REFERENCES grupo(id),
    FOREIGN KEY (permissao_id) REFERENCES permissao(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS usuario_grupo (
    usuario_id INTEGER,
    grupo_id INTEGER,
    FOREIGN KEY (usuario_id) REFERENCES usuario(id),
    FOREIGN KEY (grupo_id) REFERENCES grupo(id)
  )`);
});

module.exports = db;
