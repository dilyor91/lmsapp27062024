package uz.momoit.lms_canvas.service.mapper;

import org.mapstruct.*;
import uz.momoit.lms_canvas.domain.Building;
import uz.momoit.lms_canvas.domain.Course;
import uz.momoit.lms_canvas.domain.Room;
import uz.momoit.lms_canvas.domain.StudyTerm;
import uz.momoit.lms_canvas.domain.Teacher;
import uz.momoit.lms_canvas.domain.TimeTable;
import uz.momoit.lms_canvas.service.dto.BuildingDTO;
import uz.momoit.lms_canvas.service.dto.CourseDTO;
import uz.momoit.lms_canvas.service.dto.RoomDTO;
import uz.momoit.lms_canvas.service.dto.StudyTermDTO;
import uz.momoit.lms_canvas.service.dto.TeacherDTO;
import uz.momoit.lms_canvas.service.dto.TimeTableDTO;

/**
 * Mapper for the entity {@link TimeTable} and its DTO {@link TimeTableDTO}.
 */
@Mapper(componentModel = "spring")
public interface TimeTableMapper extends EntityMapper<TimeTableDTO, TimeTable> {
    @Mapping(target = "course", source = "course", qualifiedByName = "courseId")
    @Mapping(target = "teacher", source = "teacher", qualifiedByName = "teacherId")
    @Mapping(target = "building", source = "building", qualifiedByName = "buildingId")
    @Mapping(target = "room", source = "room", qualifiedByName = "roomId")
    @Mapping(target = "studyTerm", source = "studyTerm", qualifiedByName = "studyTermId")
    TimeTableDTO toDto(TimeTable s);

    @Named("courseId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    CourseDTO toDtoCourseId(Course course);

    @Named("teacherId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    TeacherDTO toDtoTeacherId(Teacher teacher);

    @Named("buildingId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    BuildingDTO toDtoBuildingId(Building building);

    @Named("roomId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    RoomDTO toDtoRoomId(Room room);

    @Named("studyTermId")
    @BeanMapping(ignoreByDefault = true)
    @Mapping(target = "id", source = "id")
    StudyTermDTO toDtoStudyTermId(StudyTerm studyTerm);
}
