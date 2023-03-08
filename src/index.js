const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const jobs = require("./utils/job");
const apiRoutes = require("./routes/index");
const { createChannel, subscribeMessage } = require("./utils/message-queue");
const { REMINDER_BINDING_KEY } = require("./config/serverConfig");
const emailService = require("./services/email-service");

const setupAndStartServer = async (req, res) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use('/api', apiRoutes);

    const channel = await createChannel();
    subscribeMessage(channel, emailService.subscribeEvents, REMINDER_BINDING_KEY);

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);

        jobs();
    });

}

setupAndStartServer();