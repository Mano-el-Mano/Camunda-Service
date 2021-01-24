import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CamundaService } from './camunda.service';
import { ReviewDTO } from './data/review.schema';

@Controller('camunda')
export class CamundaController {
  constructor(private readonly camundaService: CamundaService) {}

  @Get()
  helloCamunda() {
    return this.camundaService.getCamunda();
  }

  @Get('tasks')
  getTaskStatus() {
    return this.camundaService.getCurrentTasks();
  }

  @Get('review')
  getReviews() {
    return this.camundaService.getAllReviews();
  }

  @Post('completeShare/:taskId')
  async completeShare(@Param('taskId') taskId: string) {
    return this.camundaService.completeShareStakeholderTask(taskId);
  }

  @Post('completeReview/:taskId')
  async completeReview(
    @Body() reviewDto: ReviewDTO,
    @Param('taskId') taskId: string,
  ) {
    try {
      const camundaResponse = await this.camundaService.completeReviewTask(
        reviewDto.reviewScore,
        taskId,
      );
      const mongoResponse = await this.camundaService.createReview(reviewDto);
      return mongoResponse;
    } catch (error) {
      console.log(error);
      throw new HttpException('Something went wrong', HttpStatus.BAD_REQUEST);
    }
  }

  @Post('review')
  createReview(@Body() reviewDto: ReviewDTO) {
    return this.camundaService.createReview(reviewDto);
  }
}
