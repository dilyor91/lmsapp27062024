package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Building;
import uz.momoit.lms_canvas.domain.Faculty;
import uz.momoit.lms_canvas.service.dto.BuildingDTO;
import uz.momoit.lms_canvas.service.dto.FacultyDTO;

/**
 * Mapper for the entity {@link Building} and its DTO {@link BuildingDTO}.
 */
@Mapper(componentModel = "spring")
public interface BuildingMapper extends EntityMapper<BuildingDTO, Building> {
    @Mapping(target = "faculty", source = "faculty", qualifiedByName = "facultyId")
    BuildingDTO toDto(Building s);

    @Named("facultyId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    FacultyDTO toDtoFacultyId(Faculty faculty);
}
