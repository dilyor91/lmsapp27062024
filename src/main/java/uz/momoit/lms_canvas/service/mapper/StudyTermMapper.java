package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.StudyAcademicYear;
import uz.momoit.lms_canvas.domain.StudyTerm;
import uz.momoit.lms_canvas.service.dto.StudyAcademicYearDTO;
import uz.momoit.lms_canvas.service.dto.StudyTermDTO;

/**
 * Mapper for the entity {@link StudyTerm} and its DTO {@link StudyTermDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudyTermMapper extends EntityMapper<StudyTermDTO, StudyTerm> {
    @Mapping(target = "studyAcademicYear", source = "studyAcademicYear", qualifiedByName = "studyAcademicYearId")
    StudyTermDTO toDto(StudyTerm s);

    @Named("studyAcademicYearId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudyAcademicYearDTO toDtoStudyAcademicYearId(StudyAcademicYear studyAcademicYear);
}
