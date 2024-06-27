package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Option;
import uz.momoit.lms_canvas.domain.Question;
import uz.momoit.lms_canvas.domain.QuizSession;
import uz.momoit.lms_canvas.domain.StudentAnswerQuestion;
import uz.momoit.lms_canvas.service.dto.OptionDTO;
import uz.momoit.lms_canvas.service.dto.QuestionDTO;
import uz.momoit.lms_canvas.service.dto.QuizSessionDTO;
import uz.momoit.lms_canvas.service.dto.StudentAnswerQuestionDTO;

/**
 * Mapper for the entity {@link StudentAnswerQuestion} and its DTO {@link StudentAnswerQuestionDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudentAnswerQuestionMapper extends EntityMapper<StudentAnswerQuestionDTO, StudentAnswerQuestion> {
    @Mapping(target = "question", source = "question", qualifiedByName = "questionId")
    @Mapping(target = "option", source = "option", qualifiedByName = "optionId")
    @Mapping(target = "quizSession", source = "quizSession", qualifiedByName = "quizSessionId")
    StudentAnswerQuestionDTO toDto(StudentAnswerQuestion s);

    @Named("questionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuestionDTO toDtoQuestionId(Question question);

    @Named("optionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OptionDTO toDtoOptionId(Option option);

    @Named("quizSessionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuizSessionDTO toDtoQuizSessionId(QuizSession quizSession);
}
