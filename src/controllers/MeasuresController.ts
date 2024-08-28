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
      const response = await measure.create();
      if (measure.errors) {
        const statusCode = (): number => {
          switch (measure.error_code) {
            case 'INVALID_DATA':
              return 400;
            case 'DOUBLE_REPORT':
              return 409;
            default:
              return 500;
          }
        }
        return res.status(statusCode()).json({
          error_code: measure.error_code,
          error_description: measure.errors.trim()
        });
      }
      return res.json(response);
    } catch(err) {
      console.log(err);
      return res.status(500).json({
        error_code: 'UNKNOWN_ERROR',
        error_description: 'Ocorreu um erro desconhecido :('
      });
    }
  }

  async confirm(req: Request, res: Response) {}
}

export default new MeasuresController();