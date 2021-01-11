import { HttpException, HttpService, HttpStatus, Injectable } from "@nestjs/common";
import { Client } from "camunda-external-task-client-js";
import { config } from "src/config";
import axios, { AxiosAdapter, AxiosInstance } from 'axios'
import { Task } from "./data/task.class";
import { plainToClass } from "class-transformer";
import { ReviewRepository } from "./repositories/review.repository";
import { ReviewDTO } from "./data/review.schema";
import { MongoError } from 'mongodb'


@Injectable()
export class CamundaService {
    private camundaUrl: string
    private camundaKey: string
    //should be stored in Redis
    private currentTasks: Task[]
    constructor(private httpService: HttpService, private readonly reviewRepository: ReviewRepository) { 
        this.camundaUrl = config.baseUrl;
        this.camundaKey = config.key
        this.currentTasks = []
    }

    getCamunda(){
        return 'hello camunda'
    }

    async completeReviewTask(reviewScore: number, taskId: string){
        console.log(taskId)
        const url = `${this.camundaUrl}/task/${taskId}/complete`
        const body = {
            variables: {
                    reviewScore:{
                        value: reviewScore
                    }
            }
        }
        try{
        const response = await this.httpService.post(url, body).toPromise()
        if(response.status === 204 || response.status === 200){
            return true
        }
    } catch(error){
        throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST)
    }
    }

    async completeShareStakeholderTask(taskId: string){
        
        const url = `${this.camundaUrl}/task/${taskId}/complete`
        const response = await this.httpService.post(url, {}).toPromise();
        if(response.status === 200 || response.status === 204){
            return true
        }else{
            throw new HttpException("Something went wrong", HttpStatus.BAD_REQUEST)
        }
    }


    async getCurrentTasks(): Promise<Task[]>{
        const url = `${this.camundaUrl}/task?processDefinitionKey=${this.camundaKey}`
        try{
        const response = await this.httpService.get(url).toPromise()
        const parsedTasks: Task[] = response.data.map(entry =>{
            return plainToClass(Task, entry, {excludeExtraneousValues: true})
        })
        console.log(parsedTasks)
        this.currentTasks = parsedTasks

        return parsedTasks
        }catch(error){
            throw new HttpException("Something went wrong", 401)
        }
    }

    async getAllReviews(){
        return this.reviewRepository.findAll()
    }


    async createReview(review: ReviewDTO){
        return this.reviewRepository.create(review);
    }
}