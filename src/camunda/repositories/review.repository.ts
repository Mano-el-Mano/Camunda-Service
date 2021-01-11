import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Review, ReviewDocument, ReviewDTO } from "../data/review.schema";


@Injectable()
export class ReviewRepository{
    constructor(@InjectModel(Review.name) private readonly reviewModel: Model<ReviewDocument>){}

    async create(review: ReviewDTO){
        const createdReview = new this.reviewModel(review);
        return createdReview.save();
    }

    async findAll(){
        return this.reviewModel.find();
    }

}