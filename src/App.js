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
require('./Routes/VecinoRoutes')(app);
require('./Routes/VecindarioRoute')(app);
require('./Routes/SolicitudesRoutes')(app);
require('./Routes/CargoRoutes')(app);
require('./Routes/FrecuenciaRoutes')(app);
require('./Routes/EventosRoutes')(app);
require('./Routes/AportesRoutes')(app);
require('./Routes/CuotasRoutes')(app);
require('./Routes/PagosRoutes')(app);
require('./Routes/TipoAportesRoutes')(app);
require("./Routes/SuplidorRoute")(app);
require('./Routes/GAstoRoute')(app);
require('./Routes/authenticationRoutes')(app);

//statics files
app.listen(app.get('port'), () =>{
    console.log('server on port ' + app.get('port'));
});