package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.StudentQuestion} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentQuestionDTO implements Serializable {

    private Long id;

    private Integer ordNum;

    private QuizSessionDTO quizSession;

    private QuestionDTO question;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdNum() {
        return ordNum;
    }

    public void setOrdNum(Integer ordNum) {
        this.ordNum = ordNum;
    }

    public QuizSessionDTO getQuizSession() {
        return quizSession;
    }

    public void setQuizSession(QuizSessionDTO quizSession) {
        this.quizSession = quizSession;
    }

    public QuestionDTO getQuestion() {
        return question;
    }

    public void setQuestion(QuestionDTO question) {
        this.question = question;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentQuestionDTO)) {
            return false;
        }

        StudentQuestionDTO studentQuestionDTO = (StudentQuestionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, studentQuestionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentQuestionDTO{" +
            "id=" + getId() +
            ", ordNum=" + getOrdNum() +
            ", quizSession=" + getQuizSession() +
            ", question=" + getQuestion() +
            "}";
    }
}
