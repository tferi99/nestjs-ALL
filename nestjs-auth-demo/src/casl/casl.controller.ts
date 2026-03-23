import { Body, Controller, Delete, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { Action } from './action';
import { AppAbility, CaslAbilityFactory } from './casl-ability.factory';
import { Author } from './author';
import { Article } from './article';
import { PoliciesGuard } from './policies.guard';
import { CheckPolicies } from './check-policies.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { HttpBasicAuthGuard } from '../auth/http-basic-auth-guard';

@Controller('casl')
export class CaslController {
  constructor(private caslAbilityFactory: CaslAbilityFactory) {}

  @Get('testAbilities')
  testAbilities(): void {
    const author: Author = new Author();
    author.id = 1;
    author.isAdmin = false;
    const ability = this.caslAbilityFactory.createForAuthor(author);

    const art1 = new Article();
    art1.authorId = author.id;
    art1.isPublished = true;

    const can1 = ability.can(Action.Update, art1);
    console.log('Test ability 1: ', can1);

    const can2 = ability.can(Action.Update, art1);
    console.log('Test ability 2: ', can2);

    const can3 = ability.can(Action.Delete, art1);
    console.log('Test ability 3: ', can3);

    art1.isPublished = false;
    const can4 = ability.can(Action.Delete, art1);
    console.log('Test ability 4: ', can4);
  }

  @Get('find')
  @UseGuards(HttpBasicAuthGuard, PoliciesGuard)
  @CheckPolicies((ability: AppAbility) => {
    const ret = ability.can(Action.Read, Article);
    console.log('CheckPolicies handler():', ret);
    return ret;
  })
  find(): string {
    return 'ok';
  }

  @Delete('article')
  @UseGuards(HttpBasicAuthGuard)
  deleteArticle(@Body() article: Article, @Req() req): string {
    const author = Author.fromUser(req.user);
    const ability = this.caslAbilityFactory.createForAuthor(author);
    console.log('deleteArticle(): ', article);
    const test = ability.can(Action.Delete, article);
    if (!test) {
      throw new UnauthorizedException('Published - cannot be deleted');
    }
    return 'ok';
  }
}
