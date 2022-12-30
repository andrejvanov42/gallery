import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContentService } from './content.service';
import { CreateContentDto } from './dto/create-content.dto';

@Controller('content')
export class ContentController {
  constructor(private contentService: ContentService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image'))
  createContent(
    @Body() dto: CreateContentDto,
    @UploadedFile() image,
    @Req() request: any,
  ) {
    const userId: number = request.userId;
    return this.contentService.create(dto, image, userId);
  }
}
