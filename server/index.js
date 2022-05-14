import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

//components
import Connection from "./database/db.js";
import router from "./routes/route.js";

const app = express();

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/', router);

const PORT = 8000;

app.listen(PORT, ()=> console.log(`Server is running on Port ${PORT}`));

//database connection
Connection();