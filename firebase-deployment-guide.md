# Firestore Rules Deployment Guide

This guide explains how to deploy your Firestore security rules using the Firebase CLI.

## Setup Firebase CLI

If you haven't installed the Firebase CLI yet, install it using npm:

```bash
npm install -g firebase-tools
```

## Login to Firebase

Login to your Firebase account:

```bash
firebase login
```

## Initialize Firebase in your project (if not already done)

```bash
firebase init
```

During initialization:
1. Select "Firestore" when prompted
2. Choose your Firebase project
3. When asked about Firestore Rules, specify the path as `firestore.rules`

## Deploy Firestore Rules

Once your project is initialized, deploy your rules with:

```bash
firebase deploy --only firestore:rules
```

## Verification

Verify your rules were deployed by checking the Firebase Console:
1. Go to https://console.firebase.google.com/
2. Select your project
3. Navigate to "Firestore Database"
4. Click on "Rules" tab

## Setting up Notification Routes

To set up notifications when a contact form is submitted:

### Option 1: Firebase Cloud Functions + Email

Set up a Cloud Function that triggers on new document creation in the `messages` collection and sends an email:

```javascript
// Example Cloud Function (functions/index.js)
const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

exports.sendContactNotification = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    const messageData = snapshot.data();
    
    // Set up email transport (e.g., with Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
    
    // Send email
    await transporter.sendMail({
      from: "Your App <your-email@gmail.com>",
      to: "recipient@example.com",
      subject: "New Contact Form Submission",
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${messageData.name}</p>
        <p><strong>Email:</strong> ${messageData.email}</p>
        <p><strong>Phone:</strong> ${messageData.phone || "Not provided"}</p>
        <p><strong>Message:</strong> ${messageData.message}</p>
      `,
    });
  });
```

### Option 2: Slack Integration

Set up a Cloud Function to send messages to a Slack webhook:

```javascript
const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.sendToSlack = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    const messageData = snapshot.data();
    
    // Post to Slack webhook
    await fetch("YOUR_SLACK_WEBHOOK_URL", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: "*New Contact Form Submission*",
            },
          },
          {
            type: "section",
            fields: [
              {
                type: "mrkdwn",
                text: `*Name:*\n${messageData.name}`,
              },
              {
                type: "mrkdwn",
                text: `*Email:*\n${messageData.email}`,
              },
              {
                type: "mrkdwn", 
                text: `*Phone:*\n${messageData.phone || "Not provided"}`,
              },
              {
                type: "mrkdwn",
                text: `*Message:*\n${messageData.message}`,
              },
            ],
          },
        ],
      }),
    });
  });
```

### Option 3: Telegram Bot

Set up a Cloud Function to send messages to a Telegram bot:

```javascript
const functions = require("firebase-functions");
const fetch = require("node-fetch");

exports.sendToTelegram = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    const messageData = snapshot.data();
    const TELEGRAM_BOT_TOKEN = "YOUR_TELEGRAM_BOT_TOKEN";
    const TELEGRAM_CHAT_ID = "YOUR_CHAT_ID";
    
    const message = `
New Contact Form Submission:
---------------------------
Name: ${messageData.name}
Email: ${messageData.email}
Phone: ${messageData.phone || "Not provided"}
---------------------------
Message: ${messageData.message}
    `;
    
    // Send to Telegram
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: "HTML",
        }),
      }
    );
  });
```

To implement any of these notification methods, you'll need to set up Firebase Cloud Functions:

```bash
firebase init functions
```

Then deploy your functions:

```bash
firebase deploy --only functions
```
