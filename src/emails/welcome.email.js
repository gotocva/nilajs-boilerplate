


const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to [Your Company]</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }

    .email-container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
    }

    .email-header {
      text-align: center;
      margin-bottom: 30px;
    }

    .email-header h1 {
      color: #4CAF50;
    }

    .email-content {
      font-size: 16px;
      line-height: 1.5;
      color: #333333;
      margin-bottom: 20px;
    }

    .email-content p {
      margin: 0 0 10px;
    }

    .cta-button {
      display: inline-block;
      background-color: #4CAF50;
      color: #ffffff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      font-weight: bold;
      text-align: center;
    }

    .footer {
      text-align: center;
      font-size: 12px;
      color: #777777;
      margin-top: 30px;
    }

    @media (max-width: 600px) {
      .email-container {
        padding: 15px;
      }

      .email-content {
        font-size: 14px;
      }
    }
  </style>
</head>
<body>
  <div class="email-container">
    <div class="email-header">
      <h1>Welcome to [Your Company]!</h1>
    </div>
    <div class="email-content">
      <p>Hello [User's First Name],</p>
      <p>Thank you for signing up with [Your Company]! We're excited to have you on board. You’re just one step away from getting started.</p>
      <p>Click the button below to verify your email and complete your registration:</p>
      <p><a href="[Verification Link]" class="cta-button">Verify Email</a></p>
      <p>If you have any questions or need help, feel free to reply to this email, and we’ll be happy to assist you.</p>
      <p>Best regards,<br>The [Your Company] Team</p>
    </div>
    <div class="footer">
      <p>© [Year] [Your Company]. All rights reserved.</p>
      <p><a href="[Unsubscribe Link]" style="color: #777777; text-decoration: none;">Unsubscribe</a></p>
    </div>
  </div>
</body>
</html>
`;