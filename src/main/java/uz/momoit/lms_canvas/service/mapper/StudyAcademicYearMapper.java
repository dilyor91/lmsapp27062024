package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.StudyAcademicYear;
import uz.momoit.lms_canvas.service.dto.StudyAcademicYearDTO;

/**
 * Mapper for the entity {@link StudyAcademicYear} and its DTO {@link StudyAcademicYearDTO}.
 */
@Mapper(componentModel = "spring")
public interface StudyAcademicYearMapper extends EntityMapper<StudyAcademicYearDTO, StudyAcademicYear> {}
