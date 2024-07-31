package uz.momoit.lms_canvas.domain;

import static org.assertj.core.api.Assertions.assertThat;
import static uz.momoit.lms_canvas.domain.AssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.NotificationTestSamples.*;
import static uz.momoit.lms_canvas.domain.QuizTestSamples.*;
import static uz.momoit.lms_canvas.domain.StudentTestSamples.*;
import static uz.momoit.lms_canvas.domain.SubmissionAssignmentTestSamples.*;
import static uz.momoit.lms_canvas.domain.TeacherTestSamples.*;

import org.junit.jupiter.api.Test;
import uz.momoit.lms_canvas.web.rest.TestUtil;

class NotificationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Notification.class);
        Notification notification1 = getNotificationSample1();
        Notification notification2 = new Notification();
        assertThat(notification1).isNotEqualTo(notification2);

        notification2.setId(notification1.getId());
        assertThat(notification1).isEqualTo(notification2);

        notification2 = getNotificationSample2();
        assertThat(notification1).isNotEqualTo(notification2);
    }

    @Test
    void quizTest() {
        Notification notification = getNotificationRandomSampleGenerator();
        Quiz quizBack = getQuizRandomSampleGenerator();

        notification.setQuiz(quizBack);
        assertThat(notification.getQuiz()).isEqualTo(quizBack);

        notification.quiz(null);
        assertThat(notification.getQuiz()).isNull();
    }

    @Test
    void assignmentTest() {
        Notification notification = getNotificationRandomSampleGenerator();
        Assignment assignmentBack = getAssignmentRandomSampleGenerator();

        notification.setAssignment(assignmentBack);
        assertThat(notification.getAssignment()).isEqualTo(assignmentBack);

        notification.assignment(null);
        assertThat(notification.getAssignment()).isNull();
    }

    @Test
    void submissionAssignmentTest() {
        Notification notification = getNotificationRandomSampleGenerator();
        SubmissionAssignment submissionAssignmentBack = getSubmissionAssignmentRandomSampleGenerator();

        notification.setSubmissionAssignment(submissionAssignmentBack);
        assertThat(notification.getSubmissionAssignment()).isEqualTo(submissionAssignmentBack);

        notification.submissionAssignment(null);
        assertThat(notification.getSubmissionAssignment()).isNull();
    }

    @Test
    void studentTest() {
        Notification notification = getNotificationRandomSampleGenerator();
        Student studentBack = getStudentRandomSampleGenerator();

        notification.setStudent(studentBack);
        assertThat(notification.getStudent()).isEqualTo(studentBack);

        notification.student(null);
        assertThat(notification.getStudent()).isNull();
    }

    @Test
    void teacherTest() {
        Notification notification = getNotificationRandomSampleGenerator();
        Teacher teacherBack = getTeacherRandomSampleGenerator();

        notification.setTeacher(teacherBack);
        assertThat(notification.getTeacher()).isEqualTo(teacherBack);

        notification.teacher(null);
        assertThat(notification.getTeacher()).isNull();
    }
}
