package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudyAcademicYearTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudyAcademicYearTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudyAcademicYear.class);
        StudyAcademicYear studyAcademicYear1 = getStudyAcademicYearSample1();
        StudyAcademicYear studyAcademicYear2 = new StudyAcademicYear();
        assertThat(studyAcademicYear1).isNotEqualTo(studyAcademicYear2);

        studyAcademicYear2.setId(studyAcademicYear1.getId());
        assertThat(studyAcademicYear1).isEqualTo(studyAcademicYear2);

        studyAcademicYear2 = getStudyAcademicYearSample2();
        assertThat(studyAcademicYear1).isNotEqualTo(studyAcademicYear2);
    }

    @Test
    void studentTest() {
        StudyAcademicYear studyAcademicYear = getStudyAcademicYearRandomSampleGenerator();
        Student studentBack = getStudentRandomSampleGenerator();

        studyAcademicYear.setStudent(studentBack);
        assertThat(studyAcademicYear.getStudent()).isEqualTo(studentBack);
        assertThat(studentBack.getStudyAcademicYear()).isEqualTo(studyAcademicYear);

        studyAcademicYear.student(null);
        assertThat(studyAcademicYear.getStudent()).isNull();
        assertThat(studentBack.getStudyAcademicYear()).isNull();
    }
}
