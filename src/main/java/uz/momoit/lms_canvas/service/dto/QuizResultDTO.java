package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.QuizResult} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuizResultDTO implements Serializable {

    private Long id;

    private Integer point;

    private Integer totalQuestionCnt;

    private Integer correctAnswerCnt;

    private Integer wrongAnswerCnt;

    private QuizDTO quiz;

    private StudentDTO student;

    private QuizSessionDTO quizSession;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPoint() {
        return point;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Integer getTotalQuestionCnt() {
        return totalQuestionCnt;
    }

    public void setTotalQuestionCnt(Integer totalQuestionCnt) {
        this.totalQuestionCnt = totalQuestionCnt;
    }

    public Integer getCorrectAnswerCnt() {
        return correctAnswerCnt;
    }

    public void setCorrectAnswerCnt(Integer correctAnswerCnt) {
        this.correctAnswerCnt = correctAnswerCnt;
    }

    public Integer getWrongAnswerCnt() {
        return wrongAnswerCnt;
    }

    public void setWrongAnswerCnt(Integer wrongAnswerCnt) {
        this.wrongAnswerCnt = wrongAnswerCnt;
    }

    public QuizDTO getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizDTO quiz) {
        this.quiz = quiz;
    }

    public StudentDTO getStudent() {
        return student;
    }

    public void setStudent(StudentDTO student) {
        this.student = student;
    }

    public QuizSessionDTO getQuizSession() {
        return quizSession;
    }

    public void setQuizSession(QuizSessionDTO quizSession) {
        this.quizSession = quizSession;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuizResultDTO)) {
            return false;
        }

        QuizResultDTO quizResultDTO = (QuizResultDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, quizResultDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuizResultDTO{" +
            "id=" + getId() +
            ", point=" + getPoint() +
            ", totalQuestionCnt=" + getTotalQuestionCnt() +
            ", correctAnswerCnt=" + getCorrectAnswerCnt() +
            ", wrongAnswerCnt=" + getWrongAnswerCnt() +
            ", quiz=" + getQuiz() +
            ", student=" + getStudent() +
            ", quizSession=" + getQuizSession() +
            "}";
    }
}
