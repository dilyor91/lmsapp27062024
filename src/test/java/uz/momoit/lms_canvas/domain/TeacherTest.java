package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.DepartmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.FacultyTestSamples.*;
import static uz.momoit.lms_canvas.domain.TeacherTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class TeacherTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Teacher.class);
        Teacher teacher1 = getTeacherSample1();
        Teacher teacher2 = new Teacher();
        assertThat(teacher1).isNotEqualTo(teacher2);

        teacher2.setId(teacher1.getId());
        assertThat(teacher1).isEqualTo(teacher2);

        teacher2 = getTeacherSample2();
        assertThat(teacher1).isNotEqualTo(teacher2);
    }

    @Test
    void facultyTest() {
        Teacher teacher = getTeacherRandomSampleGenerator();
        Faculty facultyBack = getFacultyRandomSampleGenerator();

        teacher.setFaculty(facultyBack);
        assertThat(teacher.getFaculty()).isEqualTo(facultyBack);

        teacher.faculty(null);
        assertThat(teacher.getFaculty()).isNull();
    }

    @Test
    void departmentTest() {
        Teacher teacher = getTeacherRandomSampleGenerator();
        Department departmentBack = getDepartmentRandomSampleGenerator();

        teacher.setDepartment(departmentBack);
        assertThat(teacher.getDepartment()).isEqualTo(departmentBack);

        teacher.department(null);
        assertThat(teacher.getDepartment()).isNull();
    }
}
