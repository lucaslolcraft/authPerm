const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {

  db.run("DELETE FROM usuario_grupo");
  db.run("DELETE FROM grupo_permissao");
  db.run("DELETE FROM usuario");
  db.run("DELETE FROM grupo");
  db.run("DELETE FROM permissao");
  db.run("DELETE FROM sistema");

  db.run(`INSERT INTO sistema (id, nome, descricao) VALUES
    (1, 'Sistema Acadêmico', 'Controle de alunos e disciplinas'),
    (2, 'Sistema Financeiro', 'Controle de pagamentos')
  `);

  db.run(`INSERT INTO permissao (id, nome, descricao, sistema_id) VALUES
    (1, 'VER_ALUNO', 'Permite visualizar alunos', 1),
    (2, 'EDITAR_ALUNO', 'Permite editar alunos', 1),
    (3, 'VER_PAGAMENTO', 'Permite visualizar pagamentos', 2),
    (4, 'EDITAR_PAGAMENTO', 'Permite editar pagamentos', 2)
  `);

  db.run(`INSERT INTO grupo (id, nome, sistema_id) VALUES
    (1, 'Administradores', 1),
    (2, 'Financeiro', 2)
  `);

  db.run(`INSERT INTO grupo_permissao (grupo_id, permissao_id) VALUES
    (1, 1),
    (1, 2),
    (2, 3),
    (2, 4)
  `);

  db.run(`INSERT INTO usuario (id, nome, email) VALUES
    (1, 'João Fulano', 'joao@teste.com'),
    (2, 'Maria Fulana', 'maria@teste.com')
  `);

  db.run(`INSERT INTO usuario_grupo (usuario_id, grupo_id) VALUES
    (1, 1),
    (2, 2)
  `);
});

db.close();
