

import { randomUUID } from 'crypto';
import { Database } from './database.js';
import { buildRoute } from './utils/build.js';

const database = new Database()


export const routes = [
    {
        method: 'GET',
        path: buildRoute('/users'),
        handler: (req, res) => {
          const { search } = req.query

          const users = database.select('users', search ? {
            name: search,
            email: search
          } : null)

          return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoute('/users'),
        handler: (req, res ) => {
            debugger
            const { name, email} = req.body;
            const user = {
                id: randomUUID(),
                name: name,
                email: email
            }
            database.insert('users', user);
            return res.writeHead(201).end('Criação de usuário');
        }
    }, 
    {
        method: 'PUT',
        path: buildRoute('/users/:id'),
        handler: (req, res) => {
          const { id } = req.params
          const { name, email } = req.body
    
          database.update('users', id, {
            name,
            email,
          })
    
          return res.writeHead(204).end()
        }
      }
    ,
    {
        method: 'DELETE',
        path: buildRoute('/users/:id'),
        handler: (req, res ) => {
            debugger
            const { id } = req.params;
            database.delete('users', id);
            return res.writeHead(204).end();
        }
    }
]