import { Controller, Delete, Get, Post, Put, Param, Body , HttpCode } from '@nestjs/common';
import { AppService } from './app.service';
import { ReportType, data } from './data';
import { v4 } from "uuid";



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
    const report = data.report.filter(report => report.type === reportType).find(report => report.id === id);
    if(!report) return "Report not found";

    const reportIndex = data.report.findIndex(report => report.id === id);

    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
    }

    return data.report[reportIndex];
  }

  @HttpCode(204)
  @Delete(":id")
  deleteReport(
    @Param("id") id: string
  ) {
    
    const reportIndex = data.report.findIndex(report => report.id === id);
    console.log(reportIndex);
    
    if(reportIndex === -1) return "Report not found";

    data.report.splice(reportIndex, 1);

    console.log(data.report);
    


    return "Deleted";
  }
}
