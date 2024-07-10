package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.AttachmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.CourseTestSamples.*;
import static uz.momoit.lms_canvas.domain.GradeTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;
import static uz.momoit.lms_canvas.domain.SubmissionAssignmentTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class SubmissionAssignmentTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SubmissionAssignment.class);
        SubmissionAssignment submissionAssignment1 = getSubmissionAssignmentSample1();
        SubmissionAssignment submissionAssignment2 = new SubmissionAssignment();
        assertThat(submissionAssignment1).isNotEqualTo(submissionAssignment2);

        submissionAssignment2.setId(submissionAssignment1.getId());
        assertThat(submissionAssignment1).isEqualTo(submissionAssignment2);

        submissionAssignment2 = getSubmissionAssignmentSample2();
        assertThat(submissionAssignment1).isNotEqualTo(submissionAssignment2);
    }

    @Test
    void studentTest() {
        SubmissionAssignment submissionAssignment = getSubmissionAssignmentRandomSampleGenerator();
        Student studentBack = getStudentRandomSampleGenerator();

        submissionAssignment.setStudent(studentBack);
        assertThat(submissionAssignment.getStudent()).isEqualTo(studentBack);

        submissionAssignment.student(null);
        assertThat(submissionAssignment.getStudent()).isNull();
    }

    @Test
    void courseTest() {
        SubmissionAssignment submissionAssignment = getSubmissionAssignmentRandomSampleGenerator();
        Course courseBack = getCourseRandomSampleGenerator();

        submissionAssignment.setCourse(courseBack);
        assertThat(submissionAssignment.getCourse()).isEqualTo(courseBack);

        submissionAssignment.course(null);
        assertThat(submissionAssignment.getCourse()).isNull();
    }

    @Test
    void assignmentTest() {
        SubmissionAssignment submissionAssignment = getSubmissionAssignmentRandomSampleGenerator();
        Assignment assignmentBack = getAssignmentRandomSampleGenerator();

        submissionAssignment.setAssignment(assignmentBack);
        assertThat(submissionAssignment.getAssignment()).isEqualTo(assignmentBack);

        submissionAssignment.assignment(null);
        assertThat(submissionAssignment.getAssignment()).isNull();
    }

    @Test
    void attachmentTest() {
        SubmissionAssignment submissionAssignment = getSubmissionAssignmentRandomSampleGenerator();
        Attachment attachmentBack = getAttachmentRandomSampleGenerator();

        submissionAssignment.setAttachment(attachmentBack);
        assertThat(submissionAssignment.getAttachment()).isEqualTo(attachmentBack);

        submissionAssignment.attachment(null);
        assertThat(submissionAssignment.getAttachment()).isNull();
    }

    @Test
    void gradeTest() {
        SubmissionAssignment submissionAssignment = getSubmissionAssignmentRandomSampleGenerator();
        Grade gradeBack = getGradeRandomSampleGenerator();

        submissionAssignment.setGrade(gradeBack);
        assertThat(submissionAssignment.getGrade()).isEqualTo(gradeBack);
        assertThat(gradeBack.getSubmissionAssignment()).isEqualTo(submissionAssignment);

        submissionAssignment.grade(null);
        assertThat(submissionAssignment.getGrade()).isNull();
        assertThat(gradeBack.getSubmissionAssignment()).isNull();
    }
}
