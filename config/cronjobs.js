const cron = require('node-cron');
const { updateArticlesJob } = require('../helpers/job');

var task = cron.schedule('0 * * * * *', () => {
    updateArticlesJob();
}
);

// start method is called to start the above defined cron job
task.start();

// stop method is called to stop already started cron job
// task.stop();

// destroy method is called to stop and destroy already started cron job, after destroy you have to reinitialize the task as it is destroyed.
// task.destroy();