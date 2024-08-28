import { Request, Response } from 'express';

import Measure from '../models/MeasureModel';

export type MeasureBody = {
  image: string;
  customer_code: string;
  measure_datetime: string;
  measure_type: "WATER" | "GAS";
};

class MeasuresController {
  async create(req: Request, res: Response) {
    const body: MeasureBody = req.body;
    try {
      const measure = new Measure(body);
      await measure.create();
      if (measure.errors) {
        return res.status(400).json({
          "error_code": "INVALID_DATA",
          "error_description": measure.errors.trim()
        });
      }
    } catch(err) {

    }
    res.send();
  }
}

export default new MeasuresController();