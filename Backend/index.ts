import express, {Request, Response} from 'express';
import userRouter from "./routes/userRouter";

const cors = require('cors');

const app = express()
const port = 3000

app.use(express.json());
app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/', (req: Request, res: Response) => {
    res.send('Server is running')
})

app.use('/api', userRouter);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

