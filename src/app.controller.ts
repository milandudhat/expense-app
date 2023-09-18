import { Controller, Delete, Get, Post, Put, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('report/:type')
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getAllReports(
    @Param("type") type: string
  ) {
    console.log(type);
    return ["Report 1", "Report 2"];
  }

  @Get(":id")
  getReportById() {
    return {};
  }

  @Post()
  createReport() {
    return "Created";
  }

  @Put(":id")
  updateReport() {
    return "Updated";
  }

  @Delete(":id")
  deleteReport() {
    return "Deleted";
  }
}
