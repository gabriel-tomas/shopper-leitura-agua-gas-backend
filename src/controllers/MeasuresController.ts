import { Request, Response } from 'express';

class MeasuresController {
  async create(req: Request, res: Response) {
    res.json({oi: 'oi'});
  }
}

export default new MeasuresController();