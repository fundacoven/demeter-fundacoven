import { PartialType } from '@nestjs/mapped-types';
import { CreateKidDto } from './create-kid.dto';

export class UpdateKidDto extends PartialType(CreateKidDto) {}
