package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Question;
import uz.momoit.lms_canvas.domain.QuestionGroup;
import uz.momoit.lms_canvas.service.dto.QuestionDTO;
import uz.momoit.lms_canvas.service.dto.QuestionGroupDTO;

/**
 * Mapper for the entity {@link Question} and its DTO {@link QuestionDTO}.
 */
@Mapper(componentModel = "spring")
public interface QuestionMapper extends EntityMapper<QuestionDTO, Question> {
    @Mapping(target = "questionGroup", source = "questionGroup", qualifiedByName = "questionGroupId")
    QuestionDTO toDto(Question s);

    @Named("questionGroupId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuestionGroupDTO toDtoQuestionGroupId(QuestionGroup questionGroup);
}
