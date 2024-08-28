import { Router } from 'express';

const router = Router();

import measuresController from '../controllers/MeasuresController';

router.post('/upload', measuresController.create);

export default router;