import { IsEnum, IsOptional } from "class-validator";
import { PaginationDto } from "src/common";
import { OrderStatusEnum, OrderStatusListEnum } from "../enum/order.enum";

export class CustomPaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(OrderStatusListEnum, {
        message: 'Solo se acepta los siguientes estados:' + OrderStatusListEnum
    })
    status: OrderStatusEnum
}