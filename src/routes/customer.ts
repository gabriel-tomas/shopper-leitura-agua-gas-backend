import { Router } from 'express';

const router = Router();

import customerController from '../controllers/CustomerController';

router.get('/:customercode/list', customerController.show);

export default router;