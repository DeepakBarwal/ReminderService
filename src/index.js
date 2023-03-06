const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const jobs = require("./utils/job");
const apiRoutes = require("./routes/index");

const setupAndStartServer = (req, res) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);

        jobs();
    });

}

setupAndStartServer();