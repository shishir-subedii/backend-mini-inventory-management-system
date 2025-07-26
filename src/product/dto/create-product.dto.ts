import { IsNumber, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty({ example: 'Product Name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Product description' })
    @IsString()
    description: string;   

    @ApiProperty({ example: 100 })
    @IsNumber()
    price: number;

    @ApiProperty({ example: 10 })
    @IsNumber()
    quantity: number;
}
