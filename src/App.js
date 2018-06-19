const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());

//routes
require('./Routes/DiscusionesRoutes')(app);
require('./Routes/DiscusionesComentariosRoutes')(app);

//statics files
app.listen(app.get('port'), () =>{
    console.log('server on port ' + app.get('port'));
});