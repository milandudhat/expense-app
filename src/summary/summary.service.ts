import { Injectable } from '@nestjs/common';
import { ReportType , data } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
    constructor(private readonly reportService: ReportService) { }
    calculateSummary() {

        const totalExpense = this.reportService.getAllReports(ReportType.EXPENSE).reduce((total, report) => total + report.amount, 0);
        const totalIncome = this.reportService.getAllReports(ReportType.INCOME).reduce((total, report) => total + report.amount, 0);
        const netIncome = totalIncome - totalExpense;

        return  {
            totalExpense,
            totalIncome,
            netIncome
        }
    }
}
