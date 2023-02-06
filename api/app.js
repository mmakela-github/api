import express from 'express';
import bodyParser from 'body-parser';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import areaController from './controllers/areaController.js';

import { errorHandler, validationErrorHandler } from './errorHandlers.js';

const app = express();
const hostname = '0.0.0.0';
const PORT = process.env.PORT || 3000;
console.log('process.env.PORT', process.env.PORT);

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/**
 * @openapi
 * /area/circle/{radius}:
 *   get:
 *     summary: Get area of circle using PATH-parameter for radius
 *     responses:
 *       200:
 *         description: Returns area of circle, given parameter and type of operation
 *       404:
 *         description: Returns error when server fails to validate the parameter
 * 
 *   parameters:
 *      - name: radius
 *        in: path
 *        description: Radius of circle
 *        required: true 
 */
app.get('/area/circle/:radius', areaController.circle);

/**
 * @openapi
 * /area/square?side={side}:
 *   get:
 *     summary: Get area of square using query parameter
 *     responses:
 *       200:
 *         description: Returns area of square, given parameter and type of operation
 *       404:
 *         description: Returns error when server fails to validate the parameter
 * 
 *   parameters:
 *      - name: side
 *        in: query
 *        description: Length of the side of the square
 *        required: true 
 */
app.get('/area/square', areaController.square);

/**
 * @openapi
 * /area/rectangle:
 *  post:
 *    summary: Get area of rectangle using request's parameters
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              height:
 *                oneOf:
 *                  - type: number
 *                  - type: string
 *                required: true
 *              width:
 *                oneOf:
 *                  - type: number
 *                  - type: string
 *                required: true
 *    responses:
 *      200:
 *        description: Returns area of rectangle, given parameters and type of operation
 *      404:
 *        description: Returns error when server fails to validate the parameter(s)
 */
app.post('/area/rectangle', areaController.rectangle);

app.use(validationErrorHandler);
app.use(errorHandler);

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Express API with Swagger",
            version: "0.1.0",
            description: "This is simple Express API"
        },
        servers: [
            {
                url: `http://localhost:${PORT}`,
            }
        ]
    },
    apis: ["app.js"],
};
  
const specs = swaggerJsdoc(options);

app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);

app.get('*', (req, res) => res.redirect('/api-docs'));

app.listen(PORT, () => {
    console.log(`Server running at http://${hostname}:${PORT}/`);
});

export default app;