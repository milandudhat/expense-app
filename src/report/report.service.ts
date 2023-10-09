import { Injectable } from '@nestjs/common';
import { ReportType , data } from 'src/data';
import { v4 } from "uuid";
import { ReportResponseDto } from 'src/dtos/report.dto';

interface reportData {
  source: string,
  amount: number
}

interface updateReport {
  source?: string,
  amount?: number
}

@Injectable()
export class ReportService {
  getHello(): string {
    return 'Hello World!';
  }

  getAllReports( type :  ReportType ) : ReportResponseDto[]{
    return data.report.filter(report => report.type === type).map(report => new ReportResponseDto(report));
  }

  getReportById( type :  ReportType , id : string ) : ReportResponseDto {
    const report = data.report.filter(report => report.type === type).find(report => report.id === id);
    if(!report) return
    return new ReportResponseDto(report);
  }

  createReport( type :  ReportType , body : reportData ) : ReportResponseDto {
    const createReport = {
      id: v4(),
      source: body.source,
      amount: body.amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type
    }
    data.report.push(createReport);
    return new ReportResponseDto(createReport);
  }

  updateReport( type :  ReportType , id : string , body : updateReport ) : ReportResponseDto {
    const report = data.report.filter(report => report.type === type).find(report => report.id === id);
    // if(!report) return "Report not found";
    const reportIndex = data.report.findIndex(report => report.id === id);
    data.report[reportIndex] = {
      ...data.report[reportIndex],
      ...body,
      updated_at: new Date()
    }
    // return data.report[reportIndex];
    return new ReportResponseDto(data.report[reportIndex]);
  }

  deleteReport(id : string ) {
    const reportIndex = data.report.findIndex(report => report.id === id);
    console.log(reportIndex);
    if(reportIndex === -1) return "Report not found";
    data.report.splice(reportIndex, 1);
    console.log(data.report);
    return "Deleted";
  }
}
