import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray, IsNotEmpty } from 'class-validator';

export class CreateOrderDTO {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    buyerName: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    buyerPhone: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    buyerEmail: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    shippingMethod: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    shippingAddress: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    shippingCity: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    shippingRegion: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    shippingCountry: string;

    @ApiProperty()
    @IsArray()
    @IsNotEmpty()
    items: any[]
}