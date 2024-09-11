package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Building;
import uz.momoit.lms_canvas.domain.Room;
import uz.momoit.lms_canvas.service.dto.BuildingDTO;
import uz.momoit.lms_canvas.service.dto.RoomDTO;

/**
 * Mapper for the entity {@link Room} and its DTO {@link RoomDTO}.
 */
@Mapper(componentModel = "spring")
public interface RoomMapper extends EntityMapper<RoomDTO, Room> {
    @Mapping(target = "building", source = "building", qualifiedByName = "buildingId")
    RoomDTO toDto(Room s);

    @Named("buildingId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BuildingDTO toDtoBuildingId(Building building);
}
