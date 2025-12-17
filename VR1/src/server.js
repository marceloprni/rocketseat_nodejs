import http from 'http';
import { randomUUID } from 'crypto';
import { json } from './middlewares/json.js';
import { Database } from './middlewares/database.js';
const user = [];
const porta = 4523;

const database = new Database()

const server = http.createServer(async (req, res) => {
    
    const {method, url} = req;

    await json(req, res)
    
    if(method === 'GET' && url === '/users') {
        const user = database.select('users')
        return res.end(JSON.stringify(user));
    }

    if(method === 'POST' && url === '/users') {
        const { name, email} = req.body;
        const user = {
            id: randomUUID(),
            name: name,
            email: email
        }

        database.insert('users', user);
        return res.writeHead(201).end('Criação de usuário');
    }

    return res.writeHead(404).end()
})

server.listen(porta, function() {
    console.log(`Porta rodando ${porta}`)
})
