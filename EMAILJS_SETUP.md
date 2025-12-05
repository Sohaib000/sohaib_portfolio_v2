# EmailJS Setup Guide

This contact form uses EmailJS to send emails directly from the browser without a backend server.

## Setup Instructions

### Step 1: Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

### Step 2: Create an Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy your Service ID** (you'll need this)

### Step 3: Create an Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Set the **Subject** to: `New Contact Form Message from {{name}}`
4. In the **Content** section, switch to **HTML** mode and paste this exact code:

```html
<div style="font-family: system-ui, sans-serif, Arial; font-size: 12px">

  <div>A message by {{name}} has been received. Kindly respond at your earliest convenience.</div>

  <div

    style="

      margin-top: 20px;

      padding: 15px 0;

      border-width: 1px 0;

      border-style: dashed;

      border-color: lightgrey;

    "

  >

    <table role="presentation">

      <tr>

        <td style="vertical-align: top">

          <div

            style="

              padding: 6px 10px;

              margin: 0 10px;

              background-color: aliceblue;

              border-radius: 5px;

              font-size: 26px;

            "

            role="img"

          >

            👤

          </div>

        </td>

        <td style="vertical-align: top">

          <div style="color: #2c3e50; font-size: 16px">

            <strong>{{name}}</strong>

          </div>

          <div style="color: #cccccc; font-size: 13px">{{time}}</div>

          <p style="font-size: 16px">{{message}}</p>

        </td>

      </tr>

    </table>

  </div>

</div>
```

**Template Variables Used:**
- `{{name}}` - Sender's name
- `{{from_email}}` - Sender's email address (optional, can be added if needed)
- `{{subject}}` - Message subject (used in email subject line)
- `{{message}}` - Message content
- `{{time}}` - Timestamp (automatically generated)

5. **Copy your Template ID** (you'll need this)

### Step 4: Get Your Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**
3. **Copy your Public Key**

### Step 5: Update the Code
Open `script.js` and replace the following placeholders:

1. **Line ~460**: Replace `'YOUR_PUBLIC_KEY'` with your EmailJS Public Key
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY_HERE');
   ```

2. **Line ~500**: Replace `'YOUR_SERVICE_ID'` with your EmailJS Service ID
   ```javascript
   emailjs.send('YOUR_SERVICE_ID_HERE', 'YOUR_TEMPLATE_ID_HERE', templateParams)
   ```

3. **Line ~500**: Replace `'YOUR_TEMPLATE_ID'` with your EmailJS Template ID

4. **Line ~490**: Update the recipient email if needed (currently set to `sohaibsheikh71@gmail.com`)

### Example Configuration:
```javascript
// Initialize EmailJS
emailjs.init('abc123xyz789'); // Your Public Key

// Send email
emailjs.send('service_abc123', 'template_xyz789', templateParams)
```

## Testing
1. Fill out the contact form on your website
2. Submit the form
3. Check your email inbox for the message
4. Check the browser console (F12) for any errors

## Troubleshooting
- **"Email service is not initialized"**: Make sure EmailJS SDK is loaded and Public Key is correct
- **"FAILED..." error**: Check that Service ID and Template ID are correct
- **No email received**: Check spam folder, verify email service is connected properly
- **Rate limit**: Free plan allows 200 emails/month

## Security Note
The Public Key is safe to expose in frontend code. Never expose your Private Key.

## Alternative: PHP Solution
If you prefer a PHP solution instead, you can create a `send-email.php` file and update the form to POST to that endpoint.

