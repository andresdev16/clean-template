import { 
    Body,
    Controller,
    Get,
    Param,
    Post,
    Request,
    UseGuards,
    Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from 'src/Interface/Services/Jwt-Auth.guard';

import { CreateItemDTO } from 'src/Interface/DTOs/CreateItem.dto';
import { CreateItemCommand } from 'src/Application/Commands/Create-Item.command';

import { Roles } from './Services/Roles.decorator';
import { PartyRoles } from 'src/Domain/Aggregates/UserAggregate/PartyRole';
import { GetItemsQueryDTO } from './DTOs/GetItemsQuery.dto';
import { GetAllItemsQuery } from 'src/Application/Queries/Get-Items.query';
import { GetItemQueryParamDTO } from './DTOs/GetItemQuery.param.dto';
import { GetItemQuery } from 'src/Application/Queries/Get-Item.query';

@ApiTags('Products')
@Controller('products')
@Roles(PartyRoles.Seller)
export class ItemController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('create')
    async createAsync(@Request() request: any, @Body() body: CreateItemDTO): Promise<void>{
        const command = new CreateItemCommand(request.user.userId, body.name, body.qyt, body.weight, body.orders)
        await this.commandBus.execute(command)
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('all')
    async getAll(@Request() request: any, @Query() queryDto: GetItemsQueryDTO): Promise<any> {
        const query = new GetAllItemsQuery(request.user.userId, queryDto.offset, queryDto.limit);
        return { products: await this.queryBus.execute(query) };
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/:id')
    async getItem(@Param() param: GetItemQueryParamDTO): Promise<any> {
        const query = new GetItemQuery(param.id);
        return this.queryBus.execute(query);
    }
}