import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FilesService } from 'src/files/files.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { ContentEntity } from './content.entity';
import { CreateContentDto } from './dto/create-content.dto';

@Injectable()
export class ContentService {
  constructor(
    @InjectRepository(ContentEntity)
    private contentRepository: Repository<ContentEntity>,
    private fileService: FilesService,
    private readonly userService: UsersService,
  ) {}

  async create(dto: CreateContentDto, image: any, userId: number) {
    const fileName = await this.fileService.createFile(image);
    const user = await this.userService.getOneUser(userId);
    const photo = await this.contentRepository.create({
      image: fileName,
      description: dto.description,
      user: user,
    });
    await this.contentRepository.save(photo);
    return { image: photo.image };
  }
}
