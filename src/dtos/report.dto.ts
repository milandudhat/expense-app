// class-validator
import { IsNumber, IsString , IsPositive , IsNotEmpty , IsOptional } from 'class-validator';
import  { ReportType } from './../data';
import { Expose , Exclude } from 'class-transformer';

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

export class ReportResponseDto {
    id: string;
    source: string;
    amount: number;

    @Exclude()
    created_at: Date;

    @Exclude()
    updated_at: Date;
    type: ReportType;

    @Expose({ name : "createdAt"})
    trasfromCreatedAt() {
        return this.created_at;
    }



    constructor(partial : Partial<ReportResponseDto>) {
        Object.assign(this, partial);
    }
}