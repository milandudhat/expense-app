import { Injectable } from '@nestjs/common';
import { ReportType , data } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
    constructor(private readonly reportService: ReportService) { }
    calculateSummary() {

        const allExpenses = this.reportService.getAllReports(ReportType.EXPENSE);

        return  {
            totalIncome: 100,
            totalExpense: 10,
            netIncome: 100 - 10
        }
    }
}
