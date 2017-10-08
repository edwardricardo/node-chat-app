const   express = require('express'),
        path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, './../public')));

app.get('/', (req, res) => {
    res.render('./public/index.html')
})

app.listen(3000,'localhost', ()=>{
    console.log('Chat Server running up...')
});