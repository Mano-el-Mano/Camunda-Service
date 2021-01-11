import { Exclude, Expose } from "class-transformer";
import { IsDateString, isDateString, IsNumber } from "class-validator";

export class Task {

    @Expose()
    id: string
    @Expose()
    name: string

    @Expose()
    @IsDateString()
    created: string

    @Expose()
    priority: number

}