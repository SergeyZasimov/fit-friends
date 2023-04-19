import { UrlDomain, UrlRoute } from '@fit-friends/shared';
import { Controller, Get, Query } from '@nestjs/common';
import { QuerySportGymDto } from './dto/query-sport-gym.dto';
import { SportGymService } from './sport-gym.service';

@Controller(UrlDomain.SportGym)
export class SportGymController {
  constructor(private readonly sportGymService: SportGymService) {}

  @Get()
  async showMany(@Query() query: QuerySportGymDto) {
    return this.sportGymService.getMany(query);
  }

  @Get(`${UrlRoute.Info}`)
  async showGymsInfo() {
    return this.sportGymService.getInfo();
  }
}
