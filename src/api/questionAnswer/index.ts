import server from "..";
import { API_PREFIX } from "..";

const QUESTION_ANSWER_PREFIX = "questionAnswer"

type QuestionAnswer = {
    answerTo:string,
    contentHtml:string,
    ignoreUploadedImage:Array<string>
}

const questionAnserApi = {
    addAnswer: (questionAnswer:QuestionAnswer) => {
       return  server.post(
            API_PREFIX + QUESTION_ANSWER_PREFIX,
            questionAnswer
        )
    },
    vote: (v:number,answerId:string,questionId:string) => {
        return server.post(
            API_PREFIX + QUESTION_ANSWER_PREFIX + '/vote',
            {
                vote:v,
                answerId,
                questionId
            }
        )
    }
}

export default questionAnserApi
