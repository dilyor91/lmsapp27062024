package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.TimeTable} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TimeTableDTO implements Serializable {

    private Long id;

    private Integer weekNumber;

    private Integer weekDayNumber;

    private Integer pairNumber;

    private Instant actialDate;

    private CourseDTO course;

    private TeacherDTO teacher;

    private BuildingDTO building;

    private RoomDTO room;

    private StudyTermDTO studyTerm;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getWeekNumber() {
        return weekNumber;
    }

    public void setWeekNumber(Integer weekNumber) {
        this.weekNumber = weekNumber;
    }

    public Integer getWeekDayNumber() {
        return weekDayNumber;
    }

    public void setWeekDayNumber(Integer weekDayNumber) {
        this.weekDayNumber = weekDayNumber;
    }

    public Integer getPairNumber() {
        return pairNumber;
    }

    public void setPairNumber(Integer pairNumber) {
        this.pairNumber = pairNumber;
    }

    public Instant getActialDate() {
        return actialDate;
    }

    public void setActialDate(Instant actialDate) {
        this.actialDate = actialDate;
    }

    public CourseDTO getCourse() {
        return course;
    }

    public void setCourse(CourseDTO course) {
        this.course = course;
    }

    public TeacherDTO getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherDTO teacher) {
        this.teacher = teacher;
    }

    public BuildingDTO getBuilding() {
        return building;
    }

    public void setBuilding(BuildingDTO building) {
        this.building = building;
    }

    public RoomDTO getRoom() {
        return room;
    }

    public void setRoom(RoomDTO room) {
        this.room = room;
    }

    public StudyTermDTO getStudyTerm() {
        return studyTerm;
    }

    public void setStudyTerm(StudyTermDTO studyTerm) {
        this.studyTerm = studyTerm;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TimeTableDTO)) {
            return false;
        }

        TimeTableDTO timeTableDTO = (TimeTableDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, timeTableDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TimeTableDTO{" +
            "id=" + getId() +
            ", weekNumber=" + getWeekNumber() +
            ", weekDayNumber=" + getWeekDayNumber() +
            ", pairNumber=" + getPairNumber() +
            ", actialDate='" + getActialDate() + "'" +
            ", course=" + getCourse() +
            ", teacher=" + getTeacher() +
            ", building=" + getBuilding() +
            ", room=" + getRoom() +
            ", studyTerm=" + getStudyTerm() +
            "}";
    }
}
