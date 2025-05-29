import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from '../entities/form.entity';
import { CreateFormDto, UpdateFormDto } from 'src/dtos/form.dto';
import * as moment from 'moment-timezone';
import { toIST } from 'src/utils/date.util';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  async create(createFormDto: CreateFormDto): Promise<any> {
    const form = this.formRepository.create(createFormDto);
    const saved = await this.formRepository.save(form);
    return toIST(saved);
  }

  async findAll(): Promise<any[]> {
    const forms = await this.formRepository.find();
    return forms.map(form => toIST(form));
  }

  async findOne(id: string): Promise<any> {
    const form = await this.formRepository.findOne({ where: { id } });
    if (!form) throw new NotFoundException(`Form with id ${id} not found`);
    return toIST(form);
  }

  async update(id: string, updateFormDto: UpdateFormDto): Promise<any> {
    await this.findOne(id);
    await this.formRepository.update(id, updateFormDto);
    const updated = await this.findOne(id);
    return toIST(updated);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.formRepository.delete(id);
  }
}
