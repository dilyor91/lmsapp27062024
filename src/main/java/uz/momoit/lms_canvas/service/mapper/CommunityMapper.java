package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Community;
import uz.momoit.lms_canvas.domain.User;
import uz.momoit.lms_canvas.service.dto.CommunityDTO;
import uz.momoit.lms_canvas.service.dto.UserDTO;

/**
 * Mapper for the entity {@link Community} and its DTO {@link CommunityDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommunityMapper extends EntityMapper<CommunityDTO, Community> {
    @Mapping(target = "user", source = "user", qualifiedByName = "userId")
    CommunityDTO toDto(Community s);

    @Named("userId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    UserDTO toDtoUserId(User user);
}
