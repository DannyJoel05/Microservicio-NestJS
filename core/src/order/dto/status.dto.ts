import { IsEnum, IsOptional } from "class-validator";
import { OrderStatusEnum, OrderStatusListEnum } from "../order.enum";

export class StatusDto {
    @IsOptional()
    @IsEnum(OrderStatusListEnum, {
        message:  `Solo se acepta los siguientes estados ${OrderStatusListEnum}`
    })
    status: OrderStatusEnum
}