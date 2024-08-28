import { Router } from 'express';

const router = Router();

import measuresController from '../controllers/MeasuresController';

router.post('/upload', measuresController.create);
router.patch('/confirm', measuresController.confirm);

export default router;