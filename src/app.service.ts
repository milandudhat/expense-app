import { Injectable } from '@nestjs/common';
import { ReportType , data } from './data';
import { v4 } from "uuid";

interface reportData {
  source: string,
  amount: number
}

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getAllReports( type :  ReportType ) {
    return data.report.filter(report => report.type === type);
  }

  getReportById( type :  ReportType , id : string ) {
    return data.report.filter(report => report.type === type).find(report => report.id === id) || "Report not found";
  }

  createReport( type :  ReportType , body : reportData ) {
    const createReport = {
      id: v4(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === "income" ? ReportType.INCOME : ReportType.EXPENSE
    }
    data.report.push(createReport);
    return createReport;
  }

}
