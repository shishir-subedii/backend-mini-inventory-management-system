import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class QuantityBodyDto {
    @ApiProperty({ example: 'Quantity Number' })
    @IsNumber()
    quantity: number;

}
