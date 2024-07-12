package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AssignmentCommentTestSamples.*;
import static uz.momoit.lms_canvas.domain.AssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;
import static uz.momoit.lms_canvas.domain.SubmissionAssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.TeacherTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class AssignmentCommentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(AssignmentComment.class);
        AssignmentComment assignmentComment1 = getAssignmentCommentSample1();
        AssignmentComment assignmentComment2 = new AssignmentComment();
        assertThat(assignmentComment1).isNotEqualTo(assignmentComment2);

        assignmentComment2.setId(assignmentComment1.getId());
        assertThat(assignmentComment1).isEqualTo(assignmentComment2);

        assignmentComment2 = getAssignmentCommentSample2();
        assertThat(assignmentComment1).isNotEqualTo(assignmentComment2);
    }

    @Test
    void submissionAssignmentTest() {
        AssignmentComment assignmentComment = getAssignmentCommentRandomSampleGenerator();
        SubmissionAssignment submissionAssignmentBack = getSubmissionAssignmentRandomSampleGenerator();

        assignmentComment.setSubmissionAssignment(submissionAssignmentBack);
        assertThat(assignmentComment.getSubmissionAssignment()).isEqualTo(submissionAssignmentBack);

        assignmentComment.submissionAssignment(null);
        assertThat(assignmentComment.getSubmissionAssignment()).isNull();
    }

    @Test
    void assignmentTest() {
        AssignmentComment assignmentComment = getAssignmentCommentRandomSampleGenerator();
        Assignment assignmentBack = getAssignmentRandomSampleGenerator();

        assignmentComment.setAssignment(assignmentBack);
        assertThat(assignmentComment.getAssignment()).isEqualTo(assignmentBack);

        assignmentComment.assignment(null);
        assertThat(assignmentComment.getAssignment()).isNull();
    }

    @Test
    void studentTest() {
        AssignmentComment assignmentComment = getAssignmentCommentRandomSampleGenerator();
        Student studentBack = getStudentRandomSampleGenerator();

        assignmentComment.setStudent(studentBack);
        assertThat(assignmentComment.getStudent()).isEqualTo(studentBack);

        assignmentComment.student(null);
        assertThat(assignmentComment.getStudent()).isNull();
    }

    @Test
    void teacherTest() {
        AssignmentComment assignmentComment = getAssignmentCommentRandomSampleGenerator();
        Teacher teacherBack = getTeacherRandomSampleGenerator();

        assignmentComment.setTeacher(teacherBack);
        assertThat(assignmentComment.getTeacher()).isEqualTo(teacherBack);

        assignmentComment.teacher(null);
        assertThat(assignmentComment.getTeacher()).isNull();
    }
}
