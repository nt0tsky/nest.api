import {Injectable, Logger} from '@nestjs/common';
import {Bookmark} from './models/bookmark.entity';
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {NewBookmarkInput} from "@/bookmark/models/bookmark.input";
import {Identity} from "@/common/models/abstract.entity";

export type FindFilter = {
  userId: Identity
}

@Injectable()
export class BookmarkService {
  private readonly logger = new Logger(BookmarkService.name);

  constructor(@InjectRepository(Bookmark) private readonly bookmarkRepository: Repository<Bookmark>) {
  }

  async findOneById(id: number): Promise<Bookmark> {
    try {
      const bookmark = await this.bookmarkRepository.findOne({
        id
      })

      return bookmark;
    } catch (err) {
      this.logger.error(err);
    }

    return null;
  }

  async findAll(filter: FindFilter): Promise<Bookmark[]> {
    try {
      const bookmarks = await this.bookmarkRepository.find({
        user: {
          id: filter.userId
        }
      });

      return bookmarks;
    } catch (err) {
      this.logger.error(err);
    }

    return null;
  }

  async create(userId: Identity, input: NewBookmarkInput): Promise<Bookmark> {
    try {
      const bookmark = await this.bookmarkRepository.save({
        user: {
          id: userId
        },
        description: input.description
      });

      return bookmark;
    } catch (err) {
      this.logger.error(err);
    }

    return null;
  }
}