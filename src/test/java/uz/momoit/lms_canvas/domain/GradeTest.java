package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.GradeTestSamples.*;
import static uz.momoit.lms_canvas.domain.SubmissionAssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.TeacherTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class GradeTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Grade.class);
        Grade grade1 = getGradeSample1();
        Grade grade2 = new Grade();
        assertThat(grade1).isNotEqualTo(grade2);

        grade2.setId(grade1.getId());
        assertThat(grade1).isEqualTo(grade2);

        grade2 = getGradeSample2();
        assertThat(grade1).isNotEqualTo(grade2);
    }

    @Test
    void submissionAssignmentTest() {
        Grade grade = getGradeRandomSampleGenerator();
        SubmissionAssignment submissionAssignmentBack = getSubmissionAssignmentRandomSampleGenerator();

        grade.setSubmissionAssignment(submissionAssignmentBack);
        assertThat(grade.getSubmissionAssignment()).isEqualTo(submissionAssignmentBack);

        grade.submissionAssignment(null);
        assertThat(grade.getSubmissionAssignment()).isNull();
    }

    @Test
    void teacherTest() {
        Grade grade = getGradeRandomSampleGenerator();
        Teacher teacherBack = getTeacherRandomSampleGenerator();

        grade.setTeacher(teacherBack);
        assertThat(grade.getTeacher()).isEqualTo(teacherBack);

        grade.teacher(null);
        assertThat(grade.getTeacher()).isNull();
    }

    @Test
    void assignmentTest() {
        Grade grade = getGradeRandomSampleGenerator();
        Assignment assignmentBack = getAssignmentRandomSampleGenerator();

        grade.setAssignment(assignmentBack);
        assertThat(grade.getAssignment()).isEqualTo(assignmentBack);

        grade.assignment(null);
        assertThat(grade.getAssignment()).isNull();
    }
}
