// class-validator
import { IsNumber, IsString , IsPositive , IsNotEmpty , IsOptional } from 'class-validator';

export class CreateReportDto { 

    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsNotEmpty()
    source: string;
}

export class UpdateReportDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source: string;


    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;
}