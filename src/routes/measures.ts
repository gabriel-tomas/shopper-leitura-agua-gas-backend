import { Router } from 'express';

const router = Router();

import measuresController from '../controllers/MeasuresController';

router.post('/', measuresController.create);

export default router;