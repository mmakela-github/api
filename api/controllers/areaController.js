import { validateInput } from '../helpers.js';

const CIRCLE = 'circle';
const SQUARE = 'square';
const RECTANGLE = 'rectangle';

export const TYPES = {
    CIRCLE: CIRCLE,
    SQUARE: SQUARE,
    RECTANGLE: RECTANGLE
}

const areaController = {

    /*
        GET /area/circle
        - Path-parametrina ympyrän säde
    */
    circle(req, res) {
        const radius = req.params.radius;
   
        validateInput({radius: radius});

        const area = 2 * Math.PI * radius;
        return res.json({
            area: area,
            radius: radius,
            type: CIRCLE
        });
    },
    
    /* 
        GET /area/square
        - Query-parametrina neliön sivun pituus
    */
    square(req, res) {
        const side = req.query.side;

        validateInput({side: side});

        const area = side * side;
        return res.json({
            area: area,
            side: side,
            type: SQUARE
        });
    },
    
    /* 
        POST /area/rectangle
        - Body-parametreina sivujen pituudet
    */
    rectangle(req, res) {
        const { height, width } = req.body;

        validateInput({height: height, width: width});

        const area = height * width;
        return res.json({
            area: area,
            params: {height: height, width: width},
            type: RECTANGLE
        });
    }
}

export default areaController;