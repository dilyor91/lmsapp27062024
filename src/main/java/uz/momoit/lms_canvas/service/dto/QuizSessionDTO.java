package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.QuizSessionEnum;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.QuizSession} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuizSessionDTO implements Serializable {

    private Long id;

    private Instant startTime;

    private Instant endTime;

    private QuizSessionEnum quizSessionEnum;

    private StudentDTO student;

    private QuizDTO quiz;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getStartTime() {
        return startTime;
    }

    public void setStartTime(Instant startTime) {
        this.startTime = startTime;
    }

    public Instant getEndTime() {
        return endTime;
    }

    public void setEndTime(Instant endTime) {
        this.endTime = endTime;
    }

    public QuizSessionEnum getQuizSessionEnum() {
        return quizSessionEnum;
    }

    public void setQuizSessionEnum(QuizSessionEnum quizSessionEnum) {
        this.quizSessionEnum = quizSessionEnum;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public QuizDTO getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizDTO quiz) {
        this.quiz = quiz;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuizSessionDTO)) {
            return false;
        }

        QuizSessionDTO quizSessionDTO = (QuizSessionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, quizSessionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuizSessionDTO{" +
            "id=" + getId() +
            ", startTime='" + getStartTime() + "'" +
            ", endTime='" + getEndTime() + "'" +
            ", quizSessionEnum='" + getQuizSessionEnum() + "'" +
            ", student=" + getStudent() +
            ", quiz=" + getQuiz() +
            "}";
    }
}
