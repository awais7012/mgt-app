const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const cors = require('cors');
const bodyParser = require('body-parser');
const createGqlServer = require('./grapghql/app');
// const cors = require('cors')
const db = require('./db')
async function startServer() {
    const app = express();
    const PORT = 4000;
    app.use(express.json())
    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }));
    app.use(bodyParser.json());

    // Attach GraphQL server
    app.use(
        '/graphql',
        expressMiddleware(await createGqlServer())
    );

    app.get('/', (req, res) => {
        res.send('Welcome to GraphQL + Express server');
    });

    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}/graphql`);
    });
}

startServer();
