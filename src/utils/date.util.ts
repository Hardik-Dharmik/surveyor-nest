import * as moment from 'moment-timezone';
import { Form } from '../entities/form.entity';

export function toIST(form: Form): any {
  return {
    ...form,
    createDateTime: moment(form.createDateTime)
      .tz('Asia/Kolkata')
      .format('YYYY-MM-DD HH:mm:ss'),
    lastChangedDateTime: moment(form.lastChangedDateTime)
      .tz('Asia/Kolkata')
      .format('YYYY-MM-DD HH:mm:ss'),
  };
}
