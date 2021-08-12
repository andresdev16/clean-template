import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsNotEmpty, IsArray, IsOptional} from "class-validator";

export class CreateItemDTO {
    @IsArray()
    @ApiProperty()
    @IsOptional()
    readonly orders: any[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly qyt: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    readonly weight: number;
}