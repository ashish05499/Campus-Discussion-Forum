import Answer from '../model/answer-schema.js'


export const newAnswer = async (request, response) => {
    try {
        const answer = await new Answer(request.body);
        answer.save();
        response.status(200).json('Answer saved successfully');
    } catch (error) {
        response.status(500).json(error);
    }
}


export const getAnswers = async (request, response) => {
    try {
        const answers = await Answer.find({ postId: request.params.id });
        response.status(200).json(answers);
    } catch (error) {
        response.status(500).json(error)
    }
}


export const deleteAnswer = async (request, response) => {
    try {
        const answer = await Answer.findById(request.params.id);
        await answer.delete()
        response.status(200).json('Answer deleted successfully');
    } catch (error) {
        response.status(500).json(error)
    }
}