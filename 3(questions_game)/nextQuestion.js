'use strict';

/*Объект "следующий вопрос". получает от объекта "вопросы" случайный вопрос,
при помощи метода ask формирует строковое представление без правильного 
ответа, задает вопрос пользователю и возвращает его ответ*/
class NextQuestion {
    constructor(nextQuestion = questions.getQuestion()) {
        this.question = nextQuestion.question;
        this.answers = nextQuestion.answers;
        this.answer = nextQuestion.answer;
    }

    ask() {
        let a = '';
        for (let i = 0; i < 4; i++) {
            a += `${i + 1} - ${this.answers[i]}\n`;
        }
        let userAnswer = prompt(`${this.question}\n${a}`);
        return userAnswer;
    }
};