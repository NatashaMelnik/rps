const net = require('net');

const clients = [];
let answers = [];
let users = {};

const server = net.createServer(function (socket) {
    socket.write('1 - rock\n2 - scissors\n3 - paper\r\n');
    const port = socket.remotePort;
    console.log('Client IP. Port: ', socket.remoteAddress);
    console.log('Client connected. Port: ', port);

    socket.on('close', () => {
        let index = clients.indexOf(socket);
        clients.splice(index, 1);
        console.log('Closed ', port)
    })

    clients.push(socket);

    socket.on('data', (message) => {

        let mes = message.toString().replace('\n', '');
        // console.log(mes + ' mes')

        let tempKey_ = socket.remotePort + ''; // add ip

        if (mes === '1' || mes === '2' || mes === '3') {
            answers.push(message);
            users[tempKey_] = message; // add test on size
        }

        else if (mes !== '1' || mes !== '2' || mes !== '3') {
            socket.write('not 1-3 num!\r\n')
        }

        if (answers.length === 2) {

            clients.forEach(client => {

                for (let key in users) {
                    if (key == client.remotePort + '') {
                        // client.write(`you ${key} write ${users[key]} and ${GetUserResult(users[key])}\r\n`);
                        client.write(`you ${GetUserResult(users[key])}\r\n`);
                    }
                }







                // if (client === socket) {
                //     client.write(socket.remoteAddress);
                // }   



                // client.write(`you write ${answers[clients.indexOf(client)]}`);
                // client.write('_______')
                // // console.log(client._peername.port) //16384 // _peername.port
                // // client.write(answers[0] + ' & ' + answers[1]);
                // if(clients.indexOf(client) === 0){
                //     // client.write(clients.indexOf(client)+'');
                //     client.write(`you write ${answers[clients.indexOf(client)]}`);
                // }
                // if(clients.indexOf(client) === 1){
                //     // client.write(clients.indexOf(client)+'');
                //     client.write(`you write ${answers[clients.indexOf(client)]}`);
                // }
                // if(answers.port){
                //     client.write(answers.port+'');
                // }
            });
        }

    });

    socket.pipe(process.stdout);

});

function GetUserResult(str) {
    let temp = answers;

    temp[0] = temp[0].toString().replace('\n', '')
    temp[1] = temp[1].toString().replace('\n', '')
    temp[0] = temp[0].toString().replace('\r', '')
    temp[1] = temp[1].toString().replace('\r', '')
    str = str.toString().replace('\r', '')
    str = str.toString().replace('\n', '')

    if (str === '1' && temp[0] === '2' || str === '2' && temp[0] === '3' || str === '3' && temp[0] === '1' ) {
        return 'won!';
    }
    else if (str === '1' && temp[0] === '3' || str === '2' && temp[0] === '1' || str === '3' && temp[0] === '2' ) {
        return 'won!';
    }
    else if( str === temp[0]) {
        return 'draw'
    }
    else {
        return 'lost';
    }
}

server.listen(2327, '10.0.0.110');
server.on('listening', () => { console.log('Listening on ', server.address()); })