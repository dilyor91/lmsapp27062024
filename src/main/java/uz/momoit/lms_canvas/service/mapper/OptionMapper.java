package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Option;
import uz.momoit.lms_canvas.domain.Question;
import uz.momoit.lms_canvas.service.dto.OptionDTO;
import uz.momoit.lms_canvas.service.dto.QuestionDTO;

/**
 * Mapper for the entity {@link Option} and its DTO {@link OptionDTO}.
 */
@Mapper(componentModel = "spring")
public interface OptionMapper extends EntityMapper<OptionDTO, Option> {
    @Mapping(target = "question", source = "question", qualifiedByName = "questionId")
    OptionDTO toDto(Option s);

    @Named("questionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    QuestionDTO toDtoQuestionId(Question question);
}
