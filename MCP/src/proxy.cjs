const express = require('express');
const bodyParser = require('body-parser');
const { default: bodyParser } = require('body-parser');
const { NLP } = require('./parser.cjs')






const app = express()
app.use(bodyParser.json())








///// API ENDPOINTS /////

app.post("/chat", async (req, res) => {
    const { message } = req.body
    if (!message) {
        return res.status(400).json({ error: 'Message is required' })
    }
    try {
        // send message to get parsed/cleaned
        const { parsedMessage } = await NLP(message)



    }
    catch(err) {

    }

})






app.listen(3001, () => {
  console.log('Proxy listening on http://localhost:3001');
});