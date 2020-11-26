import { Injectable } from '@nestjs/common';
import { FeedBack } from './feedbacks.model';
import { v1 as uuid } from 'uuid';
import { CreateFeedBackDto } from './dto/create-feedback.dto';
@Injectable()
export class FeedbacksService {
  private feedBacks: FeedBack[] = [];

  getAllFeedBacks(): FeedBack[] {
    return this.feedBacks;
  }

  getFeedBacksWithFilters(filterDto: CreateFeedBackDto): FeedBack[] {
    const { user, subject, message} = filterDto;
    let feedBacks = this.getAllFeedBacks();

    if(user) {
      feedBacks = feedBacks.filter(feed => feed.user.includes(user));
    }
    if(message) {
      feedBacks = feedBacks.filter(feed => feed.message.includes(message));
    }
    if(subject) {
      feedBacks = feedBacks.filter(feed => feed.subject.includes(subject));
    }


    return feedBacks;
  }

  getFeedBackById(id: string): FeedBack {
    return this.feedBacks.find(feedBack => feedBack.id === id);
  }

  creatFeedBack(createFeedBackDto: CreateFeedBackDto): FeedBack {
    const { user, subject, message} = createFeedBackDto;

    const feedBack: FeedBack = {
      id: uuid(),
      user,
      message,
      subject,
      createdAt: new Date(Date.now())
    }
      
    this.feedBacks.push(feedBack);

    return feedBack;
    }

}
