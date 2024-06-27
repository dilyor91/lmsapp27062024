package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Option;
import uz.momoit.lms_canvas.domain.StudentOption;
import uz.momoit.lms_canvas.domain.StudentQuestion;
import uz.momoit.lms_canvas.service.dto.OptionDTO;
import uz.momoit.lms_canvas.service.dto.StudentOptionDTO;
import uz.momoit.lms_canvas.service.dto.StudentQuestionDTO;

/**
 * Mapper for the entity {@link StudentOption} and its DTO {@link StudentOptionDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudentOptionMapper extends EntityMapper<StudentOptionDTO, StudentOption> {
    @Mapping(target = "studentQuestion", source = "studentQuestion", qualifiedByName = "studentQuestionId")
    @Mapping(target = "option", source = "option", qualifiedByName = "optionId")
    StudentOptionDTO toDto(StudentOption s);

    @Named("studentQuestionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudentQuestionDTO toDtoStudentQuestionId(StudentQuestion studentQuestion);

    @Named("optionId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    OptionDTO toDtoOptionId(Option option);
}
