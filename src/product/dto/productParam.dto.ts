import { IsNumber } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class productParamDto {
    @ApiProperty({ example: 'Product Id' })
    @IsNumber()
    id: number;

}
