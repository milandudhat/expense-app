
import { Controller, Delete, Get, Post, Put, Param, Body, HttpCode, ParseUUIDPipe, ParseEnumPipe } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportType } from 'src/data';
import { CreateReportDto, UpdateReportDto, ReportResponseDto } from 'src/dtos/report.dto';



@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) { }

  @Get()
  getAllReports(
    @Param("type", new ParseEnumPipe(ReportType)) type: string
  ) : ReportResponseDto [] {
    console.log(type);
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @Get(":id")
  getReportById(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Param("id", ParseUUIDPipe) id: string
  ) : ReportResponseDto {
    console.log(type);

    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Body() body: CreateReportDto
  ) : ReportResponseDto {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.createReport(reportType, body);

  }

  @Put(":id")
  updateReport(
    @Param("type", new ParseEnumPipe(ReportType)) type: string,
    @Param("id", ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto
  ) : ReportResponseDto {
    console.log(body);

    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(
    @Param("id", ParseUUIDPipe) id: string
  ) {
    return this.reportService.deleteReport(id);
  }
}
