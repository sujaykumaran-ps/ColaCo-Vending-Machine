import express from 'express';
import * as adminController from '../controllers/admin.js';

const router = express.Router();

router.route('/admin')
    .get(adminController.index)
    .post(adminController.save);

// GET by ID, PUT Routes
router.route('/admin/:id')
    .put(adminController.update)
    .delete(adminController.remove);
    
// Exporting the default value
export default router;