const express = require('express');
const router = express.Router();
const path = require('path');

// Root route handling
router.get(['/', '/index', '/index.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

// New page route handling
router.get(['/new-page', '/new-page.html'], (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'new-page.html'));
});

router.get(/^\/old-page(?:\.html)?$/, (req, res) =>{
    res.redirect(301, '/new-page.html'); // 301 is for permanent redirect
})

module.exports = router;