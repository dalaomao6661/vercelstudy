import server from "..";
import { API_PREFIX } from "..";

const QUESTION_PREFIX = "question"

type QuestionDTO = {
    ignoreImages:string[],
    title:string,
    content:string,
    describe:string
}

const questionApi = {
    add: (question:QuestionDTO) => {
        return server.post(
            API_PREFIX + QUESTION_PREFIX,
            question
        )
    },
    page: (current:number) => {
        return server.get(
            API_PREFIX + QUESTION_PREFIX + `/page/${current}`
        )
    },
    getQuestionAndAnswersById: (id:string) => {
        return server.get(
            API_PREFIX + QUESTION_PREFIX + `/${id}`
        )
    }
}

export default questionApi