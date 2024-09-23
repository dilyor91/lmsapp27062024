package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.BuildingTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.RoomTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudyTermTestSamples.*;
import static uz.momoit.lms_canvas.domain.TeacherTestSamples.*;
import static uz.momoit.lms_canvas.domain.TimeTableTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class TimeTableTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(TimeTable.class);
        TimeTable timeTable1 = getTimeTableSample1();
        TimeTable timeTable2 = new TimeTable();
        assertThat(timeTable1).isNotEqualTo(timeTable2);

        timeTable2.setId(timeTable1.getId());
        assertThat(timeTable1).isEqualTo(timeTable2);

        timeTable2 = getTimeTableSample2();
        assertThat(timeTable1).isNotEqualTo(timeTable2);
    }

    @Test
    void courseTest() {
        TimeTable timeTable = getTimeTableRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        timeTable.setCourse(courseBack);
        assertThat(timeTable.getCourse()).isEqualTo(courseBack);

        timeTable.course(null);
        assertThat(timeTable.getCourse()).isNull();
    }

    @Test
    void teacherTest() {
        TimeTable timeTable = getTimeTableRandomSampleGenerator();
        Teacher teacherBack = getTeacherRandomSampleGenerator();

        timeTable.setTeacher(teacherBack);
        assertThat(timeTable.getTeacher()).isEqualTo(teacherBack);

        timeTable.teacher(null);
        assertThat(timeTable.getTeacher()).isNull();
    }

    @Test
    void buildingTest() {
        TimeTable timeTable = getTimeTableRandomSampleGenerator();
        Building buildingBack = getBuildingRandomSampleGenerator();

        timeTable.setBuilding(buildingBack);
        assertThat(timeTable.getBuilding()).isEqualTo(buildingBack);

        timeTable.building(null);
        assertThat(timeTable.getBuilding()).isNull();
    }

    @Test
    void roomTest() {
        TimeTable timeTable = getTimeTableRandomSampleGenerator();
        Room roomBack = getRoomRandomSampleGenerator();

        timeTable.setRoom(roomBack);
        assertThat(timeTable.getRoom()).isEqualTo(roomBack);

        timeTable.room(null);
        assertThat(timeTable.getRoom()).isNull();
    }

    @Test
    void studyTermTest() {
        TimeTable timeTable = getTimeTableRandomSampleGenerator();
        StudyTerm studyTermBack = getStudyTermRandomSampleGenerator();

        timeTable.setStudyTerm(studyTermBack);
        assertThat(timeTable.getStudyTerm()).isEqualTo(studyTermBack);

        timeTable.studyTerm(null);
        assertThat(timeTable.getStudyTerm()).isNull();
    }
}
