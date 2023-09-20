import { Controller, Delete, Get, Post, Put, Param, Body , HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType } from './data';



@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getAllReports(
    @Param("type") type: string
  ) {
    console.log(type);
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.getAllReports(reportType);
  }

  @Get(":id")
  getReportById(
    @Param("type") type: string,
    @Param("id") id: string
  ) {

    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    // return data.report.filter(report => report.type === reportType).find(report => report.id === id) || "Report not found";
    return this.appService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Param("type") type: string,
    @Body() body: {
      source: string,
      amount: number
    }
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.createReport(reportType, body);

  }

  @Put(":id")
  updateReport(
    @Param("type") type: string,
    @Param("id") id: string,
    @Body() body: {
      source: string,
      amount: number
    }
  ) {
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return this.appService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(
    @Param("id") id: string
  ) {
    return this.appService.deleteReport(id);
  }
}
