package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Community;
import uz.momoit.lms_canvas.domain.CommunityTag;
import uz.momoit.lms_canvas.domain.Tag;
import uz.momoit.lms_canvas.service.dto.CommunityDTO;
import uz.momoit.lms_canvas.service.dto.CommunityTagDTO;
import uz.momoit.lms_canvas.service.dto.TagDTO;

/**
 * Mapper for the entity {@link CommunityTag} and its DTO {@link CommunityTagDTO}.
 */
@Mapper(componentModel = "spring")
public interface CommunityTagMapper extends EntityMapper<CommunityTagDTO, CommunityTag> {
    @Mapping(target = "community", source = "community", qualifiedByName = "communityId")
    @Mapping(target = "tag", source = "tag", qualifiedByName = "tagId")
    CommunityTagDTO toDto(CommunityTag s);

    @Named("communityId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CommunityDTO toDtoCommunityId(Community community);

    @Named("tagId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TagDTO toDtoTagId(Tag tag);
}
