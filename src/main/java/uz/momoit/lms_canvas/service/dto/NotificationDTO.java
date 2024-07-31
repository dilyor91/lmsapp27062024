package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.NotificationType;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Notification} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class NotificationDTO implements Serializable {

    private Long id;

    private String message;

    private Instant readDate;

    private Boolean read;

    private NotificationType notificationType;

    private QuizDTO quiz;

    private AssignmentDTO assignment;

    private SubmissionAssignmentDTO submissionAssignment;

    private StudentDTO student;

    private TeacherDTO teacher;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getReadDate() {
        return readDate;
    }

    public void setReadDate(Instant readDate) {
        this.readDate = readDate;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public NotificationType getNotificationType() {
        return notificationType;
    }

    public void setNotificationType(NotificationType notificationType) {
        this.notificationType = notificationType;
    }

    public QuizDTO getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizDTO quiz) {
        this.quiz = quiz;
    }

    public AssignmentDTO getAssignment() {
        return assignment;
    }

    public void setAssignment(AssignmentDTO assignment) {
        this.assignment = assignment;
    }

    public SubmissionAssignmentDTO getSubmissionAssignment() {
        return submissionAssignment;
    }

    public void setSubmissionAssignment(SubmissionAssignmentDTO submissionAssignment) {
        this.submissionAssignment = submissionAssignment;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public TeacherDTO getTeacher() {
        return teacher;
    }

    public void setTeacher(TeacherDTO teacher) {
        this.teacher = teacher;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NotificationDTO)) {
            return false;
        }

        NotificationDTO notificationDTO = (NotificationDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, notificationDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "NotificationDTO{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", readDate='" + getReadDate() + "'" +
            ", read='" + getRead() + "'" +
            ", notificationType='" + getNotificationType() + "'" +
            ", quiz=" + getQuiz() +
            ", assignment=" + getAssignment() +
            ", submissionAssignment=" + getSubmissionAssignment() +
            ", student=" + getStudent() +
            ", teacher=" + getTeacher() +
            "}";
    }
}
