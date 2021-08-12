import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate, IsString } from 'class-validator';

export class SetPromisesDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    readonly orderId: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly packMin: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly packMax: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly shipMin: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly shipMax: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly deliveryMin: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly deliveryMax: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly readyMin: Date;

    @ApiProperty()
    @IsNotEmpty()
    @IsDate()
    readonly readyMax: Date;

}