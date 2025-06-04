import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from '../entities/form.entity';
import { CreateFormDto, UpdateFormDto } from '../dtos/form.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>,
  ) {}

  async create(createFormDto: CreateFormDto): Promise<any> {
    const form = this.formRepository.create(createFormDto);
    const saved = await this.formRepository.save(form);
    return saved;
  }

  async findAll(): Promise<any[]> {
    const forms = await this.formRepository.find();
    return forms;
  }

  async findOne(id: string): Promise<any> {
    const form = await this.formRepository.findOne({ where: { id } });
    if (!form) throw new NotFoundException(`Form with id ${id} not found`);
    return form;
  }

  async update(id: string, updateFormDto: UpdateFormDto): Promise<any> {
    await this.findOne(id);
    await this.formRepository.update(id, updateFormDto);
    const updated = await this.findOne(id);
    return updated;
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.formRepository.delete(id);
  }

  async changeStatus(id: string, isActive: boolean): Promise<any> {
    let form = await this.findOne(id);
    form.isActive = isActive;
    await this.formRepository.save(form);
    return form;
  }
}
