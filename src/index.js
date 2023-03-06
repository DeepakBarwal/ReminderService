const express = require("express");
const app = express();

const { PORT } = require("./config/serverConfig");
const { sendBasicEmail } = require("./services/email-service");

const setupAndStartServer = (req, res) => {

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);

        sendBasicEmail(
            'support@admin.com',
            'projectairlinemanagement@gmail.com',
            'This is a testing email',
            'Give up your heart'
        );
    });

}

setupAndStartServer();