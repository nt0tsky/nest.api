import {Module} from '@nestjs/common';
import {BookmarkResolver} from './bookmark.resolver';
import {BookmarkService} from "./bookmark.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {Bookmark} from "@/bookmark/models/bookmark.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Bookmark])],
  providers: [BookmarkResolver, BookmarkService],
})
export class BookmarkModule {
}