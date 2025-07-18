import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, Min } from "class-validator";

export class PaginationDto {

    @IsPositive()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    page?: number = 1;

    @IsPositive()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    limit?: number = 10;
}
