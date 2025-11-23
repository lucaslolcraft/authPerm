const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/sistemas', require('./routes/sistema.routes'));
app.use('/permissoes', require('./routes/permissao.routes'));
app.use('/grupos', require('./routes/grupo.routes'));
app.use('/usuarios', require('./routes/usuario.routes'));
app.use('/auth', require('./routes/auth.routes'));

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
  console.log("Swagger em http://localhost:3000/swagger");
});
