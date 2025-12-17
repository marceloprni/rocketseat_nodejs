// entrada stind e saida stdout
//process.stdin.pipe(process.stdout)

import{ Readable, Writabel, Transform} from 'node:stream'


class OneToHundredStream extends Readable {
    index = 1
    _read() {
        const i = this.index++

        setTimeout(() => {
            if(i > 100 ) {
                this.push(null)	
            } else {
                const buf = Buffer.from(String(i))
                this.push(buf)
            }

        }, 1000)
        
    }
}

class MultiplyTensStrem extends Writabel {
    
    _write(chunk, encoding, callback) {
        console.log(Number(chunk.toString()) * 10)
        callback()
    }

}

// e utilizado no meio
class InverserNumber extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        callback(null, Buffer.from(String(transformed)))
    }
}

new OneToHundredStream()
    .pipe(new InverserNumber())
    .pipe(new MultiplyTensStrem())