package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Question;
import uz.momoit.lms_canvas.domain.QuizSession;
import uz.momoit.lms_canvas.domain.StudentQuestion;
import uz.momoit.lms_canvas.service.dto.QuestionDTO;
import uz.momoit.lms_canvas.service.dto.QuizSessionDTO;
import uz.momoit.lms_canvas.service.dto.StudentQuestionDTO;

/**
 * Mapper for the entity {@link StudentQuestion} and its DTO {@link StudentQuestionDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudentQuestionMapper extends EntityMapper<StudentQuestionDTO, StudentQuestion> {
    @Mapping(target = "quizSession", source = "quizSession", qualifiedByName = "quizSessionId")
    @Mapping(target = "question", source = "question", qualifiedByName = "questionId")
    StudentQuestionDTO toDto(StudentQuestion s);

    @Named("quizSessionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuizSessionDTO toDtoQuizSessionId(QuizSession quizSession);

    @Named("questionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuestionDTO toDtoQuestionId(Question question);
}
