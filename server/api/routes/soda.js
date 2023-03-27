import express from 'express';
import * as sodaController from '../controllers/soda.js';

const router = express.Router();

router.route('/sodas')
    .get(sodaController.index)

// GET by ID, PUT Routes
router.route('/sodas/:id')
    .put(sodaController.update);
    
// Exporting the default value
export default router;