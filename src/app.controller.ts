import { Controller, Delete, Get, Post, Put, Param, Body } from '@nestjs/common';
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
    // return ["Report 1", "Report 2"];
    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;
    return data.report.filter(report => report.type === reportType);
  }

  @Get(":id")
  getReportById(
    @Param("type") type: string,
    @Param("id") id: string
  ) {

    const reportType = type === "income" ? ReportType.INCOME : ReportType.EXPENSE;

    console.log(reportType);
    console.log(id);

    return data.report.filter(report => report.type === reportType).find(report => report.id === id) || "Report not found";
  }

  @Post()
  createReport(
    @Param("type") type: string,
    @Body() body: {
      source: string,
      amount: number
    }
  ) {
    // console.log(body);
    const createReport = {
      id: v4(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    }

    console.log(createReport);
    data.report.push(createReport);
    return createReport;

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

  @Delete(":id")
  deleteReport() {
    return "Deleted";
  }
}
