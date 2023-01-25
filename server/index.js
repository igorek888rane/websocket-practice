import {WebSocketServer} from 'ws';


const wss = new WebSocketServer({
    port: 5000
}, () => console.log('Server started on 5000'))

wss.on('connection', function connection(ws) {
    ws.on('message', (message) => {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break
            case 'connection':
                console.log('s')
                broadcastMessage(message)
                break
        }
    })
})
// const message = {
//     event: 'message/connection',
//     id: 123,
//     date: '25.01.2023',
//     username: 'Igor',
//     message: 'Привет'
// }

function broadcastMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}