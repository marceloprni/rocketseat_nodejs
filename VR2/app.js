//process.stdin.pipe(process.stdout);
import { Readable, Writable, Transform, Duplex } from 'node:stream';

class OneToHoundredStream extends Readable {
    index = 1;

    _read() {
        setTimeout(() => {
            const i = this.index++;
    
            if(i > 100) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, 1000)  
    }
}

class MutiplyByTenStream extends Writable {
    _write(chunck, encoding, callback) {
        console.log(Number(chunck.toString()) * 10 )
        callback();
    }
}

class InverseNumberStream extends Transform {
    _transform(chunck, encoding, callback) {
        const transformed = Number(chunck.toString()) * -1
        callback(null, Buffer.from(String(transformed)));
    }
}

new OneToHoundredStream()
.pipe(new InverseNumberStream())
.pipe(new MutiplyByTenStream())