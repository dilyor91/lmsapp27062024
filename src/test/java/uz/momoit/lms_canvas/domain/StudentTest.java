package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.FacultyTestSamples.*;
import static uz.momoit.lms_canvas.domain.GroupTestSamples.*;
import static uz.momoit.lms_canvas.domain.SpecialityTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudyAcademicYearTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Student.class);
        Student student1 = getStudentSample1();
        Student student2 = new Student();
        assertThat(student1).isNotEqualTo(student2);

        student2.setId(student1.getId());
        assertThat(student1).isEqualTo(student2);

        student2 = getStudentSample2();
        assertThat(student1).isNotEqualTo(student2);
    }

    @Test
    void studyAcademicYearTest() {
        Student student = getStudentRandomSampleGenerator();
        StudyAcademicYear studyAcademicYearBack = getStudyAcademicYearRandomSampleGenerator();

        student.setStudyAcademicYear(studyAcademicYearBack);
        assertThat(student.getStudyAcademicYear()).isEqualTo(studyAcademicYearBack);

        student.studyAcademicYear(null);
        assertThat(student.getStudyAcademicYear()).isNull();
    }

    @Test
    void facultyTest() {
        Student student = getStudentRandomSampleGenerator();
        Faculty facultyBack = getFacultyRandomSampleGenerator();

        student.setFaculty(facultyBack);
        assertThat(student.getFaculty()).isEqualTo(facultyBack);

        student.faculty(null);
        assertThat(student.getFaculty()).isNull();
    }

    @Test
    void specialityTest() {
        Student student = getStudentRandomSampleGenerator();
        Speciality specialityBack = getSpecialityRandomSampleGenerator();

        student.setSpeciality(specialityBack);
        assertThat(student.getSpeciality()).isEqualTo(specialityBack);

        student.speciality(null);
        assertThat(student.getSpeciality()).isNull();
    }

    @Test
    void groupTest() {
        Student student = getStudentRandomSampleGenerator();
        Group groupBack = getGroupRandomSampleGenerator();

        student.setGroup(groupBack);
        assertThat(student.getGroup()).isEqualTo(groupBack);

        student.group(null);
        assertThat(student.getGroup()).isNull();
    }
}
