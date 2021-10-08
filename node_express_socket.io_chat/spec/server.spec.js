const request = require("request");

describe('calc', () => {
    it('should multiply 2 and 2', () => {
        expect(2*2).toBe(4);
    })
})

describe('get message', () => {
    it('should return 200 ok', (done) => {
        request.get('http://localhost:4000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })

    it('should return a list, not empty', (done) => {
        request.get('http://localhost:4000/messages', (err, res) => {
            console.log(typeof res.body)
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe('get message from userName', () => {
    it('should return 200 ok', (done) => {
        request.get('http://localhost:4000/messages/tim', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('name should be tim', (done) => {
        request.get('http://localhost:4000/messages/tim', (err, res) => {
            expect(JSON.parse(res.body)[0].userName).toEqual('tim')
            done()
        })
    })
})