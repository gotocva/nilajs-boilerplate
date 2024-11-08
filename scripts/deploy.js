#!/usr/bin/env node

// ====================================================
// TODO: 
// Need to implement PM2 deployment inside the project and monitor the process by commands 
// ====================================================

// Load environment variables from the .env file
require('dotenv').config();

const pm2 = require('pm2');

// Connect to PM2
pm2.connect((err) => {
    if (err) {
        console.error(err);
        process.exit(2);
    }

    // Start your application (replace 'app.js' with your actual entry point)
    pm2.start(process.cwd()+'/ecosystem.config.json', (err) => {
        if (err) {
            console.error(err);
            pm2.disconnect();
            return;
        }
    });

});