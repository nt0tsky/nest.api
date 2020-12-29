import {NotFoundException, UseGuards} from '@nestjs/common';
import {Args, Int, Mutation, Query, Resolver} from '@nestjs/graphql';
import {Bookmark} from "./models/bookmark.entity";
import {BookmarkService} from "@/bookmark/bookmark.service";
import {NewBookmarkInput} from "@/bookmark/models/bookmark.input";
import {GqlAuthGuard} from "@/signin/guards/graph.auth.guard";
import {CurrentUser} from "@/signin/resolvers/user.resolver";
import {UsersJWTDTO} from "@/common/models/users.entity";

@Resolver(of => Bookmark)
export class BookmarkResolver {
  constructor(private readonly bookmarkService: BookmarkService) {
  }

  @Query(returns => Bookmark)
  async bookmark(@Args('id', {type: () => Int}) id: number): Promise<Bookmark> {
    const bookmark = await this.bookmarkService.findOneById(id);
    if (!bookmark) {
      throw new NotFoundException(id);
    }

    return bookmark
  }

  @Query(returns => [Bookmark])
  @UseGuards(GqlAuthGuard)
  async bookmarks(@CurrentUser() user: UsersJWTDTO): Promise<Bookmark[]> {
    const bookmarks = await this.bookmarkService.findAll({
      userId: user.id
    });

    return bookmarks;
  }

  @Mutation(returns => Bookmark)
  @UseGuards(GqlAuthGuard)
  async addBookmark(
    @CurrentUser() user: UsersJWTDTO,
    @Args('bookmarkInput') bookmarkInput: NewBookmarkInput
  ): Promise<Bookmark> {
    const bookmark = await this.bookmarkService.create(user.id, bookmarkInput);

    return bookmark;
  }
}