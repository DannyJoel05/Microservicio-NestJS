import { Type } from "class-transformer";
import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive, Min } from "class-validator";
import { OrderStatusEnum, OrderStatusListEnum } from "../enum/order.enum";

export class CreateOrderDto {
    @IsNumber()
    @IsPositive()
    @Min(0)
    @Type(() => Number)
    totalAmount: number;

    @IsNumber()
    @Min(0)
    @Type(() => Number)
    totalItems: number;

    @IsEnum(OrderStatusListEnum, {
        message: `El presente estado no ne encuentra definido en: ${OrderStatusListEnum}`
    })
    @IsOptional()
    status: OrderStatusEnum = OrderStatusEnum.Pendiente

    @IsBoolean()
    @IsOptional()
    paid: boolean=false;

}

