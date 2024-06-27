package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Group;
import uz.momoit.lms_canvas.domain.Speciality;
import uz.momoit.lms_canvas.service.dto.GroupDTO;
import uz.momoit.lms_canvas.service.dto.SpecialityDTO;

/**
 * Mapper for the entity {@link Group} and its DTO {@link GroupDTO}.
 */
@Mapper(componentModel = "spring")
public interface GroupMapper extends EntityMapper<GroupDTO, Group> {
    @Mapping(target = "speciality", source = "speciality", qualifiedByName = "specialityId")
    GroupDTO toDto(Group s);

    @Named("specialityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    SpecialityDTO toDtoSpecialityId(Speciality speciality);
}
