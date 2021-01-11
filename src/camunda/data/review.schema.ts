import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema()
export class Review {

    @Prop({ max: 10, min: 1, required: true})
    reviewScore: number

    @Prop({required: true})
    userId: number

    @Prop({required: true})
    carId: number

    @Prop({required: true})
    content: string

}


export type ReviewDocument = Review & Document

export const ReviewSchema = SchemaFactory.createForClass(Review)

ReviewSchema.index({userId: 1, carId: 1}, {unique: true})
export type ReviewDTO = Review