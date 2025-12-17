import http from 'node::http';
import { Transform } from 'node:stream';

class InverseNumberStream extends Transform {
    _transform(chunck, encoding, callback) {
        const transformed = Number(chunck.toString()) * -1
        console.log(transformed)
        callback(null, Buffer.from(String(transformed)));
    }
}

// req = readableStream
// res = writableStream
const server = http.createServer( async (req, res) => {
    const buffer = [];

    for await (const chunck of req) {
        buffer.push(chunck);
    }

    

    const fullStreamContent = Buffer.concat(buffer).toString();

    console.log(fullStreamContent);

    return res.end(fullStreamContent);

    //return req.pipe(new InverseNumberStream()).pipe(res)
})

server.listen(3289);