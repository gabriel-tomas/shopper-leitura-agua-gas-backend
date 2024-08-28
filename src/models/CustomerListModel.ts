import { knex } from "../app";

class CustomerList {
  private _errors: string = '';
  private _error_code: string = '';

  constructor(private customerCode: string, private measure_type?: string | string[]) {}

  get errors() {
    return this._errors;
  }

  get error_code() {
    return this._error_code;
  }

  async list() {
    this.valid();
    if (this.errors) return;

    let request = knex('measures').select('measure_uuid', 'measure_datetime', 'measure_type', 'has_confirmed', 'image_url').where('fk_customer_code', '=', this.customerCode)

    if (this.measure_type) {
      request = request.andWhere('measure_type', '=', this.measure_type);
    }

    const measures = await request;

    if (measures.length === 0) {
      this._error_code = 'MEASURES_NOT_FOUND';
      this._errors += 'Nenhuma leitura encontrada';
      return;
    }

    const successResponse = {
      customer_code: this.customerCode,
      measures,
    }

    return successResponse;
  }

  async valid() {
    if (Array.isArray(this.measure_type) || (this.measure_type && !(this.measure_type.toUpperCase() === "WATER" || this.measure_type.toUpperCase() === "GAS"))) {
      this._error_code = 'INVALID_TYPE';
      this._errors += 'Parâmetro measure_type diferente de WATER ou GAS';
      return;
    }
  }
}

export default CustomerList;