package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.QuestionGroup;
import uz.momoit.lms_canvas.domain.Quiz;
import uz.momoit.lms_canvas.domain.QuizQuestionGroup;
import uz.momoit.lms_canvas.service.dto.QuestionGroupDTO;
import uz.momoit.lms_canvas.service.dto.QuizDTO;
import uz.momoit.lms_canvas.service.dto.QuizQuestionGroupDTO;

/**
 * Mapper for the entity {@link QuizQuestionGroup} and its DTO {@link QuizQuestionGroupDTO}.
 */
@Mapper(componentModel = "spring")
public interface QuizQuestionGroupMapper extends EntityMapper<QuizQuestionGroupDTO, QuizQuestionGroup> {
    @Mapping(target = "quiz", source = "quiz", qualifiedByName = "quizId")
    @Mapping(target = "questionGroup", source = "questionGroup", qualifiedByName = "questionGroupId")
    QuizQuestionGroupDTO toDto(QuizQuestionGroup s);

    @Named("quizId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuizDTO toDtoQuizId(Quiz quiz);

    @Named("questionGroupId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuestionGroupDTO toDtoQuestionGroupId(QuestionGroup questionGroup);
}
