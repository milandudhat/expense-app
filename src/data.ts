interface Data {
    report: {
        id: string,
        source: string,
        amount: number,
        created_at: Date,
        updated_at: Date,
        type: ReportType
    }[]
}
enum ReportType {
    INCOME = "income",
    EXPENSE = "expense"
}


export const data: Data = {
    report: [{
        id: "uuid",
        source: "salary",
        amount: 7500,
        created_at: new Date(),
        updated_at: new Date(),
        type: ReportType.INCOME
    }]
}



// data.report.push({
//     id: "uuid",
//     source: "salary",
//     amount: 7500,
//     created_at: new Date(),
//     updated_at: new Date(),
//     type: ReportType.INCOME
// })