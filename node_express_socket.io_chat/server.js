const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server)
const { User } = require('./model.js')

app.use(express.static(__dirname))

// parse application/json
app.use(bodyParser.json())

// parse application/x-www-form-urlencoded
// extended: parsing the URL-encoded data with the querystring library (when false) or the qs library (when true).
app.use(bodyParser.urlencoded({extended: false}))

app.get('/messages', async (req, res) => {
    const messages = await User.findAll({
        attributes: ['userName', 'message']
    })
    res.send(messages)
})

// get message from userName
app.get('/messages/:userName', async (req, res) => {
    const messages = await User.findAll({
        where: {
            userName: req.params.userName
        },
        attributes: ['userName', 'message']
    })
    res.send(messages)
})

// app.post('/messages', async (req, res) => {
    
//     const newUser = await User.create(req.body)
    
//     // 推送到client
//     io.emit('message', newUser)
//     res.sendStatus(200)
// })

// 使用promise进行异步控制，实现filter badword messsge的功能（只是测试异步流程）
// app.post('/messages', (req, res) => {
    
//     User.create(req.body)
//     .then(() => {
//         console.log('saved')
//         return User.findOne({
//             where: {
//                 message: 'badword' 
//             }
//         })
//     })
//     .then(censored => {
//         console.log('censored', censored)
//         if (censored) {
//             return User.destroy({
//                 where: {
//                     id: censored.id
//                 }
//             })
//         }

//          // 推送到client
//         io.emit('message', req.body)
//         res.sendStatus(200)
//     })
//     .catch(err => {
//         res.sendStatus(500);
//         return console.log(err)
//     })
// })

app.post('/messages', async (req, res) => {
    try {
        // throw new Error('some error')
        const savedUserMessage= await User.create(req.body)
        console.log('saved')

        const censored = await User.findOne({
            where: {
                message: 'badword' 
            }
        })

        if (censored) {
            await User.destroy({
                where: {
                    id: censored.id
                }
            })
        } else {
            // 推送到client
            io.emit('message', req.body)
        }

        res.sendStatus(200)
    } catch (err) {
        res.sendStatus(500);
        return console.log(err)
    } finally {
        // logger.log('message posted call')
    }
})


io.on('connection', (socket) => {
    console.log('a socket is connected')
})

const returnServer = server.listen(4000, () => {
    console.log('server is listening on port', returnServer.address().port)
})