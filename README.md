# Kintone Status Change Comment

A simple JavaScript code for Kintone that automatically adds comments when a record's status changes.

## Background

This JavaScript code was created to solve a specific notification challenge when using Kintone's MyPage Plugin:

- The MyPage Plugin only sends notifications to users in two cases:
  1. When a new record is created
  2. When someone posts a comment
- There was no built-in way to notify MyPage users about status changes
- This JavaScript code bridges this gap by automatically adding comments when status changes, which triggers MyPage notifications

By using this JavaScript code, MyPage users will receive notifications whenever a record's status changes, helping them stay updated about important changes in their records.

## What This JavaScript code Does

This JavaScript code watches for status changes in your Kintone records. When the status changes to specific values (like "Accepted" or "Closed"), it automatically adds a comment to the record.

## Features

- Automatic comment posting when status changes
- Enables MyPage notifications for status changes
- Easy to configure for different status changes
- Error handling with clear messages
- Clean and documented code

## Setup

1. Download the `status-change-comment.js` file
2. Upload it to your Kintone environment:
   - Go to Kintone Settings
   - Click on "JavaScript and CSS Customization"
   - Upload the JS file
   - Click "Save"

## How to Use

The JavaScript code works automatically after setup. It currently handles these status changes:

- When status changes to "Accepted" → Adds comment "The status has changed to 'Accepted'"
- When status changes to "Closed" → Adds comment "The status has changed to 'Closed'"

## How to Add New Status Conditions

To add new status conditions, edit the `STATUS_CONDITIONS` object in the code:

```javascript
const STATUS_CONDITIONS = {
    YOUR_NEW_STATUS: {
        condition: 'Description',
        toStatusContains: 'status-text',
        commentText: 'Your comment text'
    }
};
```

## Requirements

- Kintone environment
- Admin rights to customize your Kintone app

## Technical Details

- Language: JavaScript
- Kintone API version: v1
- Event: `app.record.detail.process.proceed`

## Error Handling

The JavaScript code:
- Logs success messages to console
- Shows error messages if comment posting fails
- Continues working even if one comment fails

## License

MIT License

## Support

If you find any bugs or have questions:
1. Open an issue on GitHub
2. Describe what happened
3. Include your Kintone app settings if possible

## Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

---
Made with ❤️ for the Kintone community 