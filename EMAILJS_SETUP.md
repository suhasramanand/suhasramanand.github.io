# EmailJS Setup Instructions

This contact form uses EmailJS to send emails without a backend server. Follow these steps to set it up:

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month free)

## Step 2: Add Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note your **Service ID** (e.g., `service_xxxxx`)

## Step 3: Create Email Template

1. Go to **Email Templates** in the dashboard
2. Click **Create New Template**
3. Use this template structure:

**Subject:**
```
New Contact Form Message from {{from_name}}
```

**Content:**
```
You have received a new message from your portfolio website.

From: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This email was sent from your portfolio contact form.
```

4. Save the template and note your **Template ID** (e.g., `template_xxxxx`)

## Step 4: Get Public Key

1. Go to **Account** > **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxxxxx`)

## Step 5: Configure Environment Variables

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and fill in your values:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id_here
   VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
   VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
   ```

3. **Important:** For production (GitHub Pages), you'll need to add these as environment variables in your build process, or use a different approach like adding them directly in the code (not recommended for security, but works for public keys).

## Step 6: For GitHub Pages Deployment

Since GitHub Pages doesn't support environment variables directly, you have a few options:

### Option A: Use GitHub Actions with Secrets (Recommended)

1. Go to your GitHub repository
2. Navigate to **Settings** > **Secrets and variables** > **Actions**
3. Add the following secrets:
   - `EMAILJS_SERVICE_ID`
   - `EMAILJS_TEMPLATE_ID`
   - `EMAILJS_PUBLIC_KEY`
4. Create/update `.github/workflows/deploy.yml` to inject these as build-time variables

### Option B: Hardcode in Code (Simplest for GitHub Pages)

Since EmailJS public keys are meant to be public (they're exposed in client-side code anyway), you can directly add them in `ContactSection.tsx`:

1. Open `src/components/ContactSection.tsx`
2. Find the `onSubmit` function
3. Replace the environment variable lines with:

```typescript
const serviceId = 'your_service_id_here';
const templateId = 'your_template_id_here';
const publicKey = 'your_public_key_here';
```

**Note:** This is safe because EmailJS public keys are designed to be public. However, keep your private keys secure and never expose them.

### Option C: Use a Different Hosting Service

Services like Netlify, Vercel, or Cloudflare Pages support environment variables natively and are free for personal projects.

## Testing

1. Start your development server: `npm run dev`
2. Fill out the contact form
3. Check your email inbox for the message

## Troubleshooting

- **"Email service is not configured"**: Make sure your `.env` file exists and has the correct variable names (they must start with `VITE_`)
- **"Failed to send message"**: Check your EmailJS dashboard for error logs
- **Emails not arriving**: Verify your email service is properly connected in EmailJS

## Free Tier Limits

- 200 emails per month
- Perfect for personal portfolios

For more emails, consider upgrading to a paid plan or using an alternative service.

