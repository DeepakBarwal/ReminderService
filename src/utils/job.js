const cron = require("node-cron");
const emailService = require("../services/email-service");
const sender = require("../config/emailConfig");

/**
 * Every 5 minutes - 
 * Checks whether there are any pending emails which were expected to be sent by now
 */

const setupJobs = () => {
    cron.schedule('*/1 * * * *', async () => {
        const response = await emailService.fetchPendingEmails();
        response.forEach((email) => {
            sender.sendMail({
                to: email.recipientEmail,
                subject: email.subject,
                text: email.content
            }, async (err, data) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(data);
                    await emailService.updateTicket(email.id, { status: "SUCCESS" });
                }
            })
        });
        console.log(response);
    });
}

module.exports = setupJobs;