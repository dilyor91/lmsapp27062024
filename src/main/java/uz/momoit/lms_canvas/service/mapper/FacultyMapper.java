package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Faculty;
import uz.momoit.lms_canvas.service.dto.FacultyDTO;

/**
 * Mapper for the entity {@link Faculty} and its DTO {@link FacultyDTO}.
 */
@Mapper(componentModel = "spring")
public interface FacultyMapper extends EntityMapper<FacultyDTO, Faculty> {}
