import { CamundaController } from './camunda.controller';
import { HttpModule, Module } from '@nestjs/common';
import { CamundaService } from './camunda.service';
import { MongooseModule } from '@nestjs/mongoose';
import { mongoUri } from 'src/config';
import { Review, ReviewSchema } from './data/review.schema';
import { ReviewRepository } from './repositories/review.repository';

@Module({
  imports: [HttpModule, MongooseModule.forFeature([{name: Review.name, schema: ReviewSchema}])],
  controllers: [CamundaController],
  providers: [CamundaService, ReviewRepository],
})
export class CamundaModule {}
