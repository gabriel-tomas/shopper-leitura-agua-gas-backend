import { converBase64ToImage } from "convert-base64-to-image";
import path from "path";

import { knex } from "../app";

import {  uploadFileToGoogleAi } from "../config/googleAiFileManager";

import { isValidDateTime } from "../utils/isValidDateTime";
import { generateGenAiContent } from "../utils/generateGenAiContent";
import { validateBase64 } from "../utils/validateBase64";

import { MeasureBody } from "../controllers/MeasuresController";

class Measure {
  private _errors: string = '';

  constructor(private body: MeasureBody) {}

  get errors() {
    return this._errors;
  }

  async create() {
    this.valid();
    if (this.errors) return;

    const customerData = { customer_code: this.body.customer_code };
    const customers = knex('customers');
    const userExists: typeof customerData[] = await customers.select('*').where('customer_code', customerData.customer_code);
    if (userExists.length === 0) {
      customers.insert(customerData);
    }

    const fileName = `${Date.now()}.png`
    const imagePath = path.join(__dirname, '..', '..', 'public', 'uploads', fileName);
    converBase64ToImage(this.body.image, imagePath);

    const uploadedResponse = await uploadFileToGoogleAi(imagePath, fileName);

    const aiResultMeasureValue = await generateGenAiContent('Main rule: do not give text, only numbers. Give me all numbers that compose a gas meter or water meter. Get the value of the gas meter or water meter, only give me the value, nothing more, no texts, only numbers of the gas or water meter. Analyze the image and provide the numerical values displayed on the meter.', uploadedResponse);

    console.log(aiResultMeasureValue);
  }

  valid() {
    let notSent = false;
    if (!this.body.image || !this.body.customer_code || !this.body.measure_datetime || !this.body.measure_type) {
      notSent = true;
       this._errors += 'É obrigatório o envio de:'
    }
    if (!this.body.image) this._errors += ' image '
    
    if (!this.body.customer_code) this._errors += ' customer_code '
    
    if (!this.body.measure_datetime) this._errors += ' measure_datetime '
    
    if (!this.body.measure_type) this._errors += ' measure_type '
    
    if (notSent) return;

    if (!validateBase64(this.body.image)) this._errors += ' image deve estar em base64 com uri (exemplo: data:image/png;base64,iVBORw...). ';
    if(this.body.customer_code.length < 3) this._errors += ' customer_code deve ter pelo menos 3 caracteres. ';
    if (!isValidDateTime(this.body.measure_datetime)) this._errors += ' measure_datetime deve estar no padrão `YYYY-MM-DD HH:MM:SS`. ';
    if (!(this.body.measure_type.toUpperCase() === "WATER" || this.body.measure_type.toUpperCase() === "GAS")) this._errors += ' measure_type deve ter o valor `WATER` ou `GAS`';
  }
}

export default Measure;