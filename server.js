const express = require('express');
const basicAuth = require('express-basic-auth');
const path = require('path');

const app = express();
const PORT = 3000;

// Serve public files (the marketing website)
app.use(express.static(path.join(__dirname, 'public')));

// Configure Secure Basic Auth for the admin area
const adminAuth = basicAuth({
    users: { 'admin@hmsolutions.ca': 'securepassword123' }, // Change this to your preferred credentials
    challenge: true,
    realm: 'HM Solutions Admin Area',
});

// Secure Admin Route
app.get('/admin', adminAuth, (req, res) => {
    // Only sends the invoice generator file IF the user logs in successfully
    res.sendFile(path.join(__dirname, 'admin.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`HM SOLUTIONS Server running on http://localhost:${PORT}`);
    console.log(`Public Website: http://localhost:${PORT}`);
    console.log(`Secure Admin Invoice Generator: http://localhost:${PORT}/admin`);
});
