import http from 'http';
import { json } from './middlewares/json.js';
import { routes } from './routes.js';
import { Database } from './database.js';
import { extractQueryParams } from './utils/extract-query-params.js'

const user = [];
const porta = 4523;

const database = new Database()

const server = http.createServer(async (req, res) => {
    //debugger
    const {method, url} = req;

    if(method === 'POST' || method === 'PUT' ){
         await json(req, res)
    }
    
    const route = routes.find(route => {
        return route.method === method && route.path.test(url);
    })

    if(route) {
        const routeParams = req.url.match(route.path)

        const { query, ...params } = routeParams.groups

        req.params = params
        req.query = query ? extractQueryParams(query) : {}

        return route.handler(req, res)
    }

    return res.writeHead(404).end()
})

server.listen(porta, function() {
    console.log(`Porta rodando ${porta}`)
})
