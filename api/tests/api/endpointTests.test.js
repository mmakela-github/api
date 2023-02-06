import supertest from 'supertest'
import app from '../../app.js'
import { VALIDATION_ERROR_MESSAGE } from '../../helpers.js'
import { TYPES } from '../../controllers/areaController.js';
const api = supertest(app);

describe('API', () => {
    describe('GET area/circle', () => {
        test('area/circle/2 responses with correct values and format', async () => {
            const circleRadius = 2;
            const response = await api.get(`/area/circle/${circleRadius}`).expect(200)
            expect(response.body.area).toBe(Math.PI * 2 * circleRadius);
            expect(response.body.radius).toBe(circleRadius.toString());
            expect(response.body.type).toBe(TYPES.CIRCLE);
        });
        test('area/circle/-2 responses with correct error', async () => {
            const circleRadius = -2;
            const response = await api.get(`/area/circle/${circleRadius}`).expect(400);
            expect(response.error).toBeDefined();
            expect(response.error.text).toBeDefined();
            const err = JSON.parse(response.error.text);
            expect(err.error.info).toBeDefined();
            expect(err.error.info).toBe(VALIDATION_ERROR_MESSAGE);
        });
    });

    describe('GET /area/square', () => {
        test('/area/square?side=2 responses with correct values and format', async () => {
            const side = 2;
            const response = await api.get(`/area/square?side=${side}`).expect(200)
            expect(response.body.area).toBe(side * side);
            expect(response.body.side).toBe(side.toString());
            expect(response.body.type).toBe(TYPES.SQUARE);
        });
        test('area/circle/0 responses with correct error', async () => {
            const side = 0;
            const response = await api.get(`/area/square?side=${side}`).expect(400);
            expect(response.error).toBeDefined();
            expect(response.error.text).toBeDefined();
            const err = JSON.parse(response.error.text);
            expect(err.error.info).toBeDefined();
            expect(err.error.info).toBe(VALIDATION_ERROR_MESSAGE);
        });
    });

    describe('POST /area/rectangle', () => {
        test('/area/rectangleresponses with correct values and format', async () => {
            const height = 3;
            const width = 4;
            const response = await api.post(`/area/rectangle`)
                .send({ width: width, height: height }).expect(200)
            expect(response.body.area).toBe(height * width);
            expect(response.body.params.height).toBe(height);
            expect(response.body.params.width).toBe(width);
            expect(response.body.type).toBe(TYPES.RECTANGLE);
        });
        test('area/rectangle responses with correct error', async () => {
            const height = 3;
            const width = null;
            const response = await api.post(`/area/rectangle`)
                .send({ width: width, height: height }).expect(400);
            expect(response.error).toBeDefined();
            expect(response.error.text).toBeDefined();
            const err = JSON.parse(response.error.text);
            expect(err.error.info).toBeDefined();
            expect(err.error.info).toBe(VALIDATION_ERROR_MESSAGE);
        });
    });
});