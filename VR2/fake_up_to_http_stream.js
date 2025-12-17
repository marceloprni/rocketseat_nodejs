import { Readable} from 'node:stream';

class OneToHoundredStream extends Readable {
    index = 1;

    _read() {
        setTimeout(() => {
            const i = this.index++;
    
            if(i > 5) {
                this.push(null);
            } else {
                const buf = Buffer.from(String(i));
                this.push(buf);
            }
        }, 1000)  
    }
}

fetch('http://localhost:3289', {
    method: 'POST',
    body: new OneToHoundredStream()
}).then( response => {
    response.text().then(data => {
        console.log(data)
    })
});