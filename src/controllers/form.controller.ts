import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateFormDto, UpdateFormDto } from '../dtos/form.dto';
import { FormsService } from '../services/form.service';

@Controller('forms')
export class FormsController {
  constructor(private readonly formsService: FormsService) {}

  @Post()
  create(@Body() createFormDto: CreateFormDto) {
    return this.formsService.create(createFormDto);
  }

  @Get()
  findAll() {
    return this.formsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.formsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFormDto: UpdateFormDto) {
    return this.formsService.update(id, updateFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    this.formsService.remove(id);
    return { message: 'Form deleted successfully !!' };
  }

  @Put(':id/status')
  changeStatus(@Param('id') id: string, @Body('status') status: boolean) {
    return this.formsService.changeStatus(id, status);
  }
}
