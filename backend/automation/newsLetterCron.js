import cron from "node-cron";
import { Job } from "../models/jobSchema.js";
import { User } from "../models/userSchema.js";
import { sendEmail } from "../utils/sendEmail.js";
import jobNewsletterTemplate from "../utils/emailTemplates/jobNewsletterTemplate.js";

export const newsLetterCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    console.log("Running newsletter automation");

    const jobs = await Job.find({ newsLettersSent: false });
    const users = await User.find({});
    const url = process.env.FRONTEND_URL;

    for (const user of users) {
      // Skip users without an email
      if (!user.email) continue;
      // console.log(" User Email:", + , user.email);

      const matchedJobs = jobs.filter(
        (job) =>
          job.jobNiche === user.niches.firstNiche ||
          job.jobNiche === user.niches.secondNiche ||
          job.jobNiche === user.niches.thirdNiche,
      );

      if (matchedJobs.length === 0) continue;

      const html = jobNewsletterTemplate(user, matchedJobs, url);

      await sendEmail({
        email: user.email,
        subject: `New ${matchedJobs.length} Job(s) Just For You`,
        html,
      });
    }

    // Mark jobs as sent
    for (const job of jobs) {
      job.newsLettersSent = true;
      await job.save();
    }
  });
};
