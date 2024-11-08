
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

// load .env variables into process.env
dotenv.config();

/**
 * 
 */
class EmailPolicy {

    transporter = nodemailer.createTransport({
        host: process.env.SMTP_EMAIL_HOST,
        port: process.env.SMTP_EMAIL_PORT,
        secure: process.env.SMTP_EMAIL_SECURE,
        auth: {
          user: process.env.SMTP_EMAIL_USERNAME,
          pass: process.env.SMTP_EMAIL_PASSWORD
        }
    });

    send = async ({ toEmail, subject, dynamicValues, htmlTemplate }) => {
        try {
          // Generate the HTML content from the template function
          const htmlContent = typeof htmlTemplate === 'function' 
            ? htmlTemplate(dynamicValues) // Inject dynamic values into the template
            : htmlTemplate; // Use the provided HTML string if no template function
      
          const mailOptions = {
            from: this.transporter.options.auth.user, // Sender's email
            to: toEmail, // Recipient's email
            subject, // Email subject
            html: htmlContent // The HTML content of the email
          };
      
          // Send the email
          const info = await this.transporter.sendMail(mailOptions);
          console.log('Email sent successfully:', info.response);
        } catch (error) {
          console.error('Error sending email:', error);
        }
    };
}


export default new EmailPolicy();

// Example dynamic values
const dynamicValues = {
  name: 'John Doe',
  email: 'johndoe@example.com',
  username: 'johnny123',
  welcomeMessage: 'We are excited to have you with us!'
};

// Generic HTML template function (for dynamic content)
const htmlTemplate = ({ name, email, username, welcomeMessage }) => `
  <html>
    <body>
      <h1>Hello, ${name}!</h1>
      <p>Welcome to our service. We're thrilled to have you on board.</p>
      <p>Here are your details:</p>
      <ul>
        <li>Email: ${email}</li>
        <li>Username: ${username}</li>
      </ul>
      <p>${welcomeMessage}</p>
      <p>Best regards,<br>Your Company</p>
    </body>
  </html>
`;

// Send an email with dynamic values
sendEmail({
  toEmail: 'recipient@example.com',
  subject: 'Welcome to Our Service',
  dynamicValues,
  htmlTemplate
});

