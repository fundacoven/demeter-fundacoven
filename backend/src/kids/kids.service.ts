import { Injectable } from '@nestjs/common';
import { CreateKidDto } from './dto/create-kid.dto';
import { UpdateKidDto } from './dto/update-kid.dto';

@Injectable()
export class KidsService {
  create(createKidDto: CreateKidDto) {
    return 'This action adds a new kid';
  }

  findAll() {
    return `This action returns all kids`;
  }

  findOne(id: number) {
    return `This action returns a #${id} kid`;
  }

  update(id: number, updateKidDto: UpdateKidDto) {
    return `This action updates a #${id} kid`;
  }

  remove(id: number) {
    return `This action removes a #${id} kid`;
  }
}
