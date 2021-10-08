const seq = require('./sequelize.js')

require('./model.js')

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok');
}).catch(() => {
    console.log('auth err');
})

// 同步数据到数据库
seq.sync({force: true}).then(() => {
    console.log('sync ok');
    process.exit();
});