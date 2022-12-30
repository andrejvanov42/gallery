import { forwardRef, Module } from '@nestjs/common';
import { ContentService } from './content.service';
import { ContentController } from './content.controller';
import { ContentEntity } from './content.entity';
import { UserEntity } from 'src/users/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesModule } from 'src/files/files.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  providers: [ContentService],
  controllers: [ContentController],
  imports: [
    TypeOrmModule.forFeature([UserEntity, ContentEntity]),
    FilesModule,
    forwardRef(() => UsersModule),
  ],
})
export class ContentModule {}
