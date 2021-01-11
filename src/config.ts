import {logger} from 'camunda-external-task-client-js'
const camundaUrl = "http://localhost:8080/engine-rest"

export const config = {
    baseUrl: camundaUrl,
    use: logger,
    key: "CreateReview"
}

const mongoConf = {
    dbName: "database",
    userName: "DatabaseManager",
    password: "A4NSd8qpHx8WfyNN"
}

export const mongoUri: string =  `mongodb+srv://${mongoConf.userName}:${mongoConf.password}@car-review-cluster.szjxc.mongodb.net/${mongoConf.dbName}?retryWrites=true&w=majority`
console.log(mongoUri)