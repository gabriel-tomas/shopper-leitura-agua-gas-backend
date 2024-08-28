import { Request, Response } from 'express';
import { get } from 'lodash';

import CustomerList from '../models/CustomerListModel';

class CustomerController {
  async show(req: Request, res: Response) {
    const { customercode } = req.params;
    const measuretype = get(req, 'query.measure_type', undefined) as | string[] | string | undefined;
    try {
      const customer = new CustomerList(customercode, measuretype);
      const response = await customer.list();
      if (customer.errors) {
        const statusCode = (): number => {
          switch (customer.error_code) {
            case 'INVALID_TYPE':
              return 400;
            case 'MEASURES_NOT_FOUND':
              return 404;
            default:
              return 500;
          }
        }
        return res.status(statusCode()).json({
          error_code: customer.error_code,
          error_description: customer.errors.trim()
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
}

export default new CustomerController();