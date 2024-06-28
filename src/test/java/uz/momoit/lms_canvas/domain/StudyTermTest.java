package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.StudyAcademicYearTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudyTermTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class StudyTermTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(StudyTerm.class);
        StudyTerm studyTerm1 = getStudyTermSample1();
        StudyTerm studyTerm2 = new StudyTerm();
        assertThat(studyTerm1).isNotEqualTo(studyTerm2);

        studyTerm2.setId(studyTerm1.getId());
        assertThat(studyTerm1).isEqualTo(studyTerm2);

        studyTerm2 = getStudyTermSample2();
        assertThat(studyTerm1).isNotEqualTo(studyTerm2);
    }

    @Test
    void studyAcademicYearTest() {
        StudyTerm studyTerm = getStudyTermRandomSampleGenerator();
        StudyAcademicYear studyAcademicYearBack = getStudyAcademicYearRandomSampleGenerator();

        studyTerm.setStudyAcademicYear(studyAcademicYearBack);
        assertThat(studyTerm.getStudyAcademicYear()).isEqualTo(studyAcademicYearBack);

        studyTerm.studyAcademicYear(null);
        assertThat(studyTerm.getStudyAcademicYear()).isNull();
    }
}
