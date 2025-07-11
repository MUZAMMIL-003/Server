import express from 'express';
import morgan from 'morgan';
import taskRoutes from './Routes/task.js';

const app = express()
const port = 4000

app.use(morgan('tiny'))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/task', taskRoutes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})