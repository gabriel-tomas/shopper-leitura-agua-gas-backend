import { converBase64ToImage } from "convert-base64-to-image";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

import { knex } from "../app";

import {  uploadFileToGoogleAi } from "../config/googleAiFileManager";

import { isValidDateTime } from "../utils/isValidDateTime";
import { generateGenAiContent } from "../utils/generateGenAiContent";
import { validateBase64 } from "../utils/validateBase64";
import { toNumericString } from "../utils/toNumericString";

import { MeasureBody } from "../controllers/MeasuresController";
import { aiMeasurePrompt } from "../config/aiMeasurePropmt";


class Measure {
  private _errors: string = '';
  private _error_code: string = '';

  constructor(private body: MeasureBody) {}

  get errors() {
    return this._errors;
  }

  get error_code() {
    return this._error_code;
  }

  async create() {
    this.valid();
    if (this.errors) {
      this._error_code = "INVALID_DATA";
      return;
    };

    const customerData = { customer_code: this.body.customer_code };
    const customers = knex('customers');
    const userExists: typeof customerData[] = await customers.select('*').where('customer_code', customerData.customer_code);
    if (userExists.length === 0) {
      await customers.insert(customerData);
    }

    const userInformedDate = new Date(this.body.measure_datetime)
    const monthData = userInformedDate.getMonth() + 1;
    const yearData = userInformedDate.getFullYear();
    const measureAlreadyExists = await knex('measures')
      .whereRaw('MONTH(measure_datetime) = ?', [monthData])
      .andWhereRaw('YEAR(measure_datetime) = ?', [yearData])
      .andWhere('measure_type', '=', this.body.measure_type)
      .andWhere('fk_customer_code', '=', this.body.customer_code);
    if (measureAlreadyExists.length > 0) {
      this._error_code = "DOUBLE_REPORT";
      this._errors += `Leitura de ${this.body.measure_type.toUpperCase() === 'GAS' ? 'gás': 'água'} do mês ${monthData} do ano ${yearData} já realizada`;
      return;
    }

    const fileName = `${Date.now()}.png`
    const imagePath = path.join(__dirname, '..', '..', 'public', 'uploads', fileName);
    converBase64ToImage(this.body.image, imagePath);

    const uploadedResponse = await uploadFileToGoogleAi(imagePath, fileName);

    const aiResultMeasureValue = await generateGenAiContent(aiMeasurePrompt, uploadedResponse);

    const measureData = {
      measure_uuid: uuidv4(),
      measure_datetime: this.body.measure_datetime,
      measure_type: this.body.measure_type,
      measure_value: toNumericString(aiResultMeasureValue),
      image_url: uploadedResponse.file.uri,
      fk_customer_code: this.body.customer_code,
    }

    await knex('measures').insert(measureData);

    const successResponse = {
      image_url: measureData.image_url,
      measure_value: measureData.measure_value,
      measure_uuid: measureData.measure_uuid,
    }

    return successResponse;
  }

  private valid() {
    let notSent = false;
    if (!this.body.image || !this.body.customer_code || !this.body.measure_datetime || !this.body.measure_type) {
      notSent = true;
      this._errors += 'É obrigatório o envio de:';
    }

    if (!this.body.image) this._errors += ' image ';
    
    if (!this.body.customer_code) this._errors += ' customer_code ';
    
    if (!this.body.measure_datetime) this._errors += ' measure_datetime ';
    
    if (!this.body.measure_type) this._errors += ' measure_type ';
    
    if (notSent) return;

    if (!validateBase64(this.body.image)) this._errors += ' image deve estar em base64 com uri (exemplo: data:image/png;base64,iVBORw...). ';
    if(typeof this.body.customer_code !== 'string') this._errors += ' customer_code deve ser uma string. ';
    if (!isValidDateTime(this.body.measure_datetime)) this._errors += ' measure_datetime deve estar no padrão `YYYY-MM-DD HH:MM:SS`. ';
    if (!(this.body.measure_type.toUpperCase() === "WATER" || this.body.measure_type.toUpperCase() === "GAS")) this._errors += ' measure_type deve ter o valor `WATER` ou `GAS`';
  }
}

export default Measure;