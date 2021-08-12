import { 
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Query,
    Request,
    UseGuards
} from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CreateOrderCommand } from "src/Application/Commands/Create-Order.command";
import { GetOrderQuery } from "src/application/Queries/Get-Order.query";
import { GetAllOrdersQuery } from "src/application/Queries/Get-Orders.query";
import { CreateOrderDTO } from "./DTOs/CreateOrder.dto";
import { GetOrderQueryParamDTO } from "./DTOs/GetOrderQuery.param.dto";
import { GetOrdersQueryDTO } from "./DTOs/GetOrdersQuery.dto";
import { JwtAuthGuard } from "./Services/Jwt-Auth.guard";
import { Roles } from "./Services/Roles.decorator";
import { PartyRoles } from "src/Domain/Aggregates/UserAggregate/PartyRole";
import { SetPromisesDTO } from "./DTOs/SetPromises.dto";
import { SetOrderPromisesCommand } from "src/Application/Commands/SetOrderPromises.command";

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) {}

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Roles(PartyRoles.Administrator)
    @Get('all')
    async getOrders(@Request() req: any, @Query() queryDto: GetOrdersQueryDTO): Promise<any> {
        const query = new GetAllOrdersQuery(req.user.userId, queryDto.offset, queryDto.limit)
        console.log(req.user)
        return { orders: await this.queryBus.execute(query) }
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('/:id')
    async getOrderById(@Param() param: GetOrderQueryParamDTO): Promise<any> {
        const query = new GetOrderQuery(param.id)
        return this.queryBus.execute(query)
    }

    @Roles(PartyRoles.Seller)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Post('create')
    async createPost(@Request() req: any, @Body() body: CreateOrderDTO) {
        const command = new CreateOrderCommand(
            req.user.userId, 
            body.buyerName, 
            body.buyerPhone, 
            body.buyerEmail,
            body.shippingMethod, 
            body.shippingAddress,
            body.shippingCity,
            body.shippingRegion,
            body.shippingCountry,
            body.items);
            console.log(req.user.userId)
        await this.commandBus.execute(command);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Put('set-promises')
    async setPromises(@Body() body: SetPromisesDTO) {
        const command = new SetOrderPromisesCommand(
            body.orderId,
            body.packMin,
            body.packMax,
            body.shipMin,
            body.shipMax,
            body.deliveryMin,
            body.deliveryMax,
            body.readyMin,
            body.readyMax
        )
        await this.commandBus.execute(command);
    }
}