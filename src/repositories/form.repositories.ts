import { EntityRepository, Repository } from 'typeorm';
import { Form } from '../entities/form.entity';

@EntityRepository(Form)
export class FormRepository extends Repository<Form> {}
