import { isInt, isUUID } from "validator";

import { knex } from "../app";

import { MeasureConfirmBody } from "../controllers/MeasuresController";

export interface MeasureProtocolDB {
  measure_uuid: string
  measure_datetime: string
  measure_type: string
  measure_value: string
  has_confirmed: number
  image_url: string
  fk_customer_code: string
}

class MeasureConfirm {
  private _errors: string = '';
  private _error_code: string = '';

  constructor(private body: MeasureConfirmBody) {}

  get errors() {
    return this._errors;
  }

  get error_code() {
    return this._error_code;
  }

  async confirm() {
    this.valid();
    if (this.errors) {
      this._error_code = "INVALID_DATA";
      return;
    };

    const measure: MeasureProtocolDB[]  = await knex('measures').where('measure_uuid', this.body.measure_uuid);
    if (measure.length === 0) {
      this._error_code = "MEASURE_NOT_FOUND";
      this._errors += 'Código de leitura não encontrada';
      return;
    }
    
    const { has_confirmed: isAlreadyConfirmed } = measure[0];

    if (isAlreadyConfirmed) {
      this._error_code = "CONFIRMATION_DUPLICATE";
      this._errors += 'Leitura já confirmada';
      return;
    }

    await knex('measures').update({
      has_confirmed: true,
      measure_value: this.body.confirmed_value
    }).where('measure_uuid', this.body.measure_uuid);

    const successResponse = {
      success: true,
    }

    return successResponse;
  }

  private valid() {
    this.cleanUp();
    let notSent = false;
    if (!this.body.measure_uuid || !this.body.confirmed_value) {
      notSent = true;
      this._errors += 'É obrigatório o envio de:';
    }

    if (!this.body.measure_uuid) this._errors += ' measure_uuid ';
    
    if (!this.body.confirmed_value) this._errors += ' confirmed_value ';
    
    if (notSent) return;

    if (typeof this.body.measure_uuid !== 'string' || !isUUID(this.body.measure_uuid)) this._errors += ' measure_uuid deve seguir o padrão UUID (exemplo: xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx).';
    if (typeof this.body.confirmed_value !== 'string' || !isInt(this.body.confirmed_value)) this._errors += ' confirmed_value deve ser somente números tipo string';
  }

  private cleanUp() {
    (Object.keys(this.body) as (keyof typeof this.body)[]).forEach((key) => {
      const value = this.body[key];
      if (typeof value === 'string') {
        (this.body as any)[key] = value.trim();
      }
    });
  }
}

export default MeasureConfirm;