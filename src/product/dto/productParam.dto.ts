import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class productParamDto {
    @ApiProperty({ example: 'c989a20d-be43-436b-b734-ad6be9004323' })
    @IsString()
    id: string;

}
