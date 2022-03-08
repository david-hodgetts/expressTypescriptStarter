import express, { Application, Request, Response } from "express";

import { initialize } from 'express-openapi';
import v1WorldsService from './api-v1/services/worldsService';
import v1ApiDoc from './api-v1/api-doc';
import swaggerUi from 'swagger-ui-express';

export const app: Application = express();
const port = 3000;

// route is on localhost:3000/v1/worlds?woldName=foo
initialize({
    app,
    // NOTE: If using yaml you can provide a path relative to process.cwd() e.g.
    // apiDoc: './api-v1/api-doc.yml',
    apiDoc: v1ApiDoc,
    dependencies: {
        worldsService: v1WorldsService
    },
    paths: './src/api-v1/paths',
    routesGlob: '**/*.{ts,js}',
    routesIndexFileRegExp: /(?:index)?\.[tj]s$/
});

app.use(
    "/api-documentation",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
        swaggerOptions: {
            url: `http://localhost:${port}/api-docs`, // runs on http://localhost:3000/v1/api-docs
        },
    })
);


try {
    app.listen(port, (): void => {
        console.log(`server running on port ${port}`);
    });
} catch (error:any) {
    console.error(`server init failed: ${error.message}`);
}
