const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(cookieParser())

//DB Connection
const db = require('./config/db')
const dbConnect = async () => {
    const connectionMessage = await db();
    console.log(connectionMessage);
};
dbConnect();






app.use(express.json());

//Routers
const authRoutes = require('./route/authRoutes');
const projectRouter = require('./route/projects')
const clientRouter = require('./route/client')
const transactionRouter = require('./route/transaction')
const employeeRouter = require('./route/employee')
const libraryRouter = require('./route/library')
const configurationRouter = require('./route/configuration')
const partyRouter = require('./route/party')
const mdetailRouter = require('./route/mdetail')

app.use('/auth', authRoutes);
app.use("/project", projectRouter);
app.use("/client", clientRouter);
app.use("/transaction", transactionRouter);
app.use("/employee", employeeRouter);
app.use("/library", libraryRouter);
app.use("/configuration", configurationRouter);
app.use("/party", partyRouter);
app.use("/mdetail", mdetailRouter);

app.listen(5006, () =>
    console.log(`Server listening on port ${5006}`)
)