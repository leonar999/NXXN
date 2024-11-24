const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set up nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'hilaryleonard474@gmail.com', // Your email address
        pass: 'wnnt zrws lmzp ecpv' // Your email password or app-specific password
    }
});

app.post('/subscribe', (req, res) => {
    const email = req.body.email;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    const mailOptions = {
        from: 'hilaryleonard474@gmail.com',
        to: email,
        subject: 'Subscription Confirmation',
        text: 'Thank you for subscribing to our newsletter!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        res.status(200).json({ message: 'Subscription successful! Please check your email for confirmation.' });
    });


    
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});