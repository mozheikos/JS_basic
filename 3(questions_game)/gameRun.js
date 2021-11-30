/*Основной "движок игры". Сделал ретурны, чтобы можно было отделить причину
окончания игры (когда пользователь нажал отмену, глупо спрашивать, хочет ли он 
еще поиграть)*/

class Game {
    static gameRun() {
        let difficulty = config.d();
        if (!difficulty) {
            return null;
        }
        let i = 1;
        let count = 0;
        while (c && i <= +difficulty) {
            let question = new NextQuestion();
            let answer = question.ask();
            if (!answer) {
                alert(`Вы прервали игру. Правильных ответов: ${count}.`);
                return answer;
            } else if (question.answers[+answer - 1] === question.answer) {
                alert('Правильно!');
                count++;
            } else {
                alert(`Ответ не правильный.
                Правильный ответ: ${question.answer}`);
            }
            i++;
        }
        return count;
    }
}