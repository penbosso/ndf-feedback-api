import { CreateFeedBackDto } from './dto/create-feedback.dto';
import { FeedbacksService } from './feedbacks.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { FeedBack } from './feedbacks.model';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private feedBacksService:FeedbacksService){}

  @Get()
  getFeedBacks(@Query() filterDto: CreateFeedBackDto): FeedBack[] {
    if(Object.keys(filterDto).length) {
      return this.feedBacksService.getFeedBacksWithFilters(filterDto);
    }
    return this.feedBacksService.getAllFeedBacks();
  }

  @Get('/:id')
  getFeedBacksById(@Param('id') id: string ): FeedBack {
    return this.feedBacksService.getFeedBackById(id);
  }
  @Post()
  creatTask(@Body() createFeedBackDto: CreateFeedBackDto): FeedBack {
    return this.feedBacksService.creatFeedBack(createFeedBackDto);
  }
}
