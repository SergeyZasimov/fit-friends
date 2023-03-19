import { UrlDomain, UserRole } from '@fit-friends/shared';
import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { CurrentUserField } from '../user/user.constant';
import { CreatePersonalTrainingDto } from './dto/create-personal-training.dto';
import { UpdatePersonalTrainingDto } from './dto/update-personal-training.dto';
import { PersonalTrainingService } from './personal-training.service';

@Controller(UrlDomain.PersonalTraining)
export class PersonalTrainingController {
  constructor(
    private readonly personalTrainingService: PersonalTrainingService
  ) {}

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Post()
  async create(
    @Body() dto: CreatePersonalTrainingDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    return this.personalTrainingService.create(dto, userId);
  }

  @Patch()
  async update(
    @Body() dto: UpdatePersonalTrainingDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    return this.personalTrainingService.update(dto, userId);
  }
}
