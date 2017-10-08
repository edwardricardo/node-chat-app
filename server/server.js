const   express = require('express'),
        path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '../Public')));

app.get('/', (req, res) => {
    res.render('./public/index.html')
})

app.listen(port,'localhost', ()=>{
    console.log(`Chat Server running on port ${port}`)
});