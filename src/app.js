const server = require('./server');

const port = 3000;
server.listen(port, () => { console.log(`O servidor esta rodando em http://localhost:${port}`); });
