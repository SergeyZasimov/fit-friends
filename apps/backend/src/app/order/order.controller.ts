import { UrlDomain, UrlRoute, UserRole } from '@fit-friends/shared';
import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { GetCurrentUser } from '../decorators/get-current-user.decorator';
import { Role } from '../decorators/role.decorator';
import { RoleGuard } from '../guards/role.guard';
import { CurrentUserField } from '../user/user.constant';
import { fillObject } from '../utils/helpers';
import { CreateOrderDto } from './dto/create-order.dto';
import { QueryTrainerOrders } from './dto/query-trainer-orders.dto';
import { OrderService } from './order.service';
import { OrderRdo } from './rdo/order.rdo';

@Controller(UrlDomain.Order)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(RoleGuard)
  @Role(UserRole.Customer)
  @Post('')
  async create(
    @Body() dto: CreateOrderDto,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    const order = await this.orderService.create(dto, userId);
    return fillObject(OrderRdo, order, order.orderType);
  }

  @UseGuards(RoleGuard)
  @Role(UserRole.Trainer)
  @Get(UrlRoute.Trainer)
  async showOrdersForTrainer(
    @Query() query: QueryTrainerOrders,
    @GetCurrentUser(CurrentUserField.Id) userId: number
  ) {
    return this.orderService.getOrdersForTrainer(query, userId);
  }
}
