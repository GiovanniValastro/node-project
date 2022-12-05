const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const favicon = require('serve-favicon');
const path = require('path');
const session = require('express-session');

const connectDb = require('./config/db');

dotenv.config();
const app = express();

connectDb();

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));
app.use(helmet());
app.use(mongoSanitize());
app.use(morgan('tiny'))
app.use(cors());
app.use(express.json());
app.use(favicon(path.join(__dirname, 'assets', 'images', 'favicon.ico')))
app.use(session({secret: process.env.SECRET_SESSION, saveUninitialized: true,resave: true}));
app.use(bodyParser.json({ limit: '30mb', extended: false }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: false }))

app.use('/post', require('./router/post'));
app.use('/user',  require('./router/user'));
app.use('/comment',  require('./router/comments'));

app.get('/', (req,res) => res.render('user/register'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is running of port ${PORT}`));

