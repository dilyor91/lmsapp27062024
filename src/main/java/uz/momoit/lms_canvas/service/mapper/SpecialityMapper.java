package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Faculty;
import uz.momoit.lms_canvas.domain.Speciality;
import uz.momoit.lms_canvas.service.dto.FacultyDTO;
import uz.momoit.lms_canvas.service.dto.SpecialityDTO;

/**
 * Mapper for the entity {@link Speciality} and its DTO {@link SpecialityDTO}.
 */
@Mapper(componentModel = "spring")
public interface SpecialityMapper extends EntityMapper<SpecialityDTO, Speciality> {
    @Mapping(target = "faculty", source = "faculty", qualifiedByName = "facultyId")
    SpecialityDTO toDto(Speciality s);

    @Named("facultyId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FacultyDTO toDtoFacultyId(Faculty faculty);
}
