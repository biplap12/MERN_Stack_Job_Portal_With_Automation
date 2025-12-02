const jobNewsletterTemplate = (user, jobs, url) => {
  // Step 1: Define Brand Colors
  const colors = {
    primary: "#4f46e5",
    secondary: "#6366f1",
    textDark: "#111",
    textLight: "#555",
    background: "#f7f7f7",
    cardBackground: "#f3f4f6",
  };

  // Step 2: Generate Job Cards
  const jobCards = jobs
    .map(
      (job) => `
      <div class="card" style="
          background:${colors.cardBackground};
          padding:18px;
          border-radius:10px;
          margin-bottom:20px;
        ">
        <h3 style="margin:0; color:${colors.textDark}; font-size:18px;">
          ${job.title}
        </h3>

        <p style="margin:6px 0; color:${colors.textLight};">
          <strong>Company:</strong> ${job.companyName}
        </p>

        <p style="margin:6px 0; color:${colors.textLight};">
          <strong>Location:</strong> ${job.location}
        </p>

        <p style="margin:6px 0; color:${colors.textLight};">
          <strong>Salary:</strong> ${job.salary}
        </p>

        <p style="margin:6px 0; color:${colors.textLight};">
          <strong>Job Niche:</strong> ${job.jobNiche}
        </p>

        <div style="margin-top:15px;">
          <a href="${url}/post/application/${job._id}"
             style="
               background:${colors.primary};
               color:#fff;
               padding:10px 15px;
               text-decoration:none;
               border-radius:6px;
               font-size:14px;
               font-weight:600;
               display:inline-block;
             ">
             View Job
          </a>
        </div>
      </div>
    `,
    )
    .join("");

  // Step 3: Compose Full HTML Email
  return `
  <html>
  <head>
    <style>
      /* DARK MODE SUPPORT */
      @media (prefers-color-scheme: dark) {
        body {
          background: #1a1a1a !important;
          color: #ffffff !important;
        }
        .container {
          background: #2a2a2a !important;
        }
        .card {
          background: #333 !important;
        }
        a {
          color: ${colors.primary} !important;
        }
      }

      /* MOBILE OPTIMIZATION */
      @media (max-width: 600px) {
        .button {
          width: 100% !important;
          display: block !important;
        }
        .container {
          padding: 15px !important;
        }
      }
    </style>
  </head>

  <body style="font-family: Arial, sans-serif; background:${colors.background}; padding:20px;">

    <!-- CONTAINER -->
    <div class="container" style="
        max-width:600px;
        margin:0 auto;
        background:#ffffff;
        border-radius:12px;
        overflow:hidden;
        box-shadow:0 4px 15px rgba(0,0,0,0.1);
      ">

      <!-- HEADER -->
      <div style="background:${colors.primary}; padding:25px; text-align:center;">
        <h1 style="margin:0; color:#fff; font-size:24px;">Job Newsletter</h1>
      </div>

      <!-- GREETING -->
      <div style="padding:25px;">
        <p style="font-size:16px; color:${colors.textDark};">
          Hi <strong>${user.name}</strong>,
        </p>
        <p style="font-size:15px; color:${colors.textLight}; line-height:1.6;">
          Based on your selected niches, here are some new job opportunities we picked for you.
        </p>

        <!-- JOB CARDS -->
        ${jobCards}

        <!-- SOCIAL MEDIA -->
        <div style="text-align:center; margin-top:20px;">
          <a href="#" style="margin:0 8px; text-decoration:none;">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384063.png" width="26" alt="Facebook">
          </a>
          <a href="#" style="margin:0 8px;">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" width="26" alt="Twitter">
          </a>
          <a href="#" style="margin:0 8px;">
            <img src="https://cdn-icons-png.flaticon.com/512/1384/1384017.png" width="26" alt="LinkedIn">
          </a>
        </div>

        <!-- CONTACT INFO -->
        <p style="font-size:12px; text-align:center; color:${colors.textLight}; margin-top:20px;">
          NicheNest Pvt. Ltd.<br>
          Kathmandu, Nepal<br>
          support@nichenest.com
        </p>
      </div>

      <!-- UNSUBSCRIBE -->
      <p style="margin-top:30px; font-size:13px; color:${colors.textLight}; text-align:center;">
        If you no longer want to receive job alerts, you can
        <a href="${url}/unsubscribe/${user._id}" style="color:${colors.primary};">unsubscribe here</a>.
      </p>

    </div>

  </body>
  </html>
  `;
};

export default jobNewsletterTemplate;
