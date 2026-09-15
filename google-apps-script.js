/**
 * Google Apps Script — paste this into your "vibrant-church-form" Google Sheet.
 *
 * SETUP:
 * 1. Create a Google Sheet named "vibrant-church-form"
 * 2. Go to Extensions → Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Deploy → New deployment
 *    • Type: Web app
 *    • Execute as: Me
 *    • Who has access: Anyone
 * 5. Click Deploy, authorize when prompted
 * 6. Copy the Web app URL
 * 7. Paste it into your .env file as VITE_GOOGLE_SHEET_URL=<your-url>
 *    (or set it in your Vercel environment variables)
 *
 * The sheet will auto-create a header row on the first submission.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    // Create header row if the sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Form',
        'Name',
        'Email',
        'Subject',
        'Message',
      ]);
      // Bold the header
      sheet.getRange(1, 1, 1, 6).setFontWeight('bold');
    }

    // Append the form data
    sheet.appendRow([
      new Date().toLocaleString('en-US', { timeZone: 'America/New_York' }),
      data.form || 'Unknown',
      data.name || '',
      data.email || '',
      data.subject || '',
      data.message || '',
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ success: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ success: false, error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Required for CORS preflight (though Apps Script handles it automatically)
function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: 'ok', message: 'Vibrant Church form endpoint is active.' })
  ).setMimeType(ContentService.MimeType.JSON);
}
