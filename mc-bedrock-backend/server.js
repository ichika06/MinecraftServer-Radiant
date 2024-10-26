const express = require('express');
const cors = require('cors');
const { createServer } = require('bedrock-protocol');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'https://your-netlify-app.netlify.app' // Replace with your Netlify frontend URL
}));

let bedrockServer;

// Endpoint to start the server
app.post('/start-server', (req, res) => {
    if (!bedrockServer) {
        bedrockServer = createServer({ host: '0.0.0.0', port: 19132 });
        bedrockServer.on('listening', () => console.log('Minecraft Bedrock Server started'));
        res.json({ message: 'Minecraft Bedrock Server started' });
    } else {
        res.json({ message: 'Server is already running' });
    }
});

// Endpoint to stop the server
app.post('/stop-server', (req, res) => {
    if (bedrockServer) {
        bedrockServer.close();
        bedrockServer = null;
        console.log('Minecraft Bedrock Server stopped');
        res.json({ message: 'Minecraft Bedrock Server stopped' });
    } else {
        res.json({ message: 'Server is not running' });
    }
});

app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
