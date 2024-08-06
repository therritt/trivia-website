const axios = require('axios');

exports.handler = async (event) => {
    try {
        // Make a GET request to the trivia API
        let url = 'https://opentdb.com/api.php?amount=5';
        const response = await axios.get(url);
        
        // Extract the trivia questions from the response
        const triviaQuestions = response.data.results.map((questionData) => {
            let combinedShuffledAnswers = questionData.incorrect_answers;
            combinedShuffledAnswers.push(questionData.correct_answer);
            combinedShuffledAnswers.sort();
            return {
                question: questionData.question,
                correctAnswer: questionData.correct_answer,
                answers: combinedShuffledAnswers
            }
        });

        return {
            userId: event.userId,
            questions: triviaQuestions
        }
    } catch (error) {
        console.error('Error fetching trivia questions:', error.message);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Failed to retrieve trivia questions',
                error: error.message
            }),
        };
    }
};
