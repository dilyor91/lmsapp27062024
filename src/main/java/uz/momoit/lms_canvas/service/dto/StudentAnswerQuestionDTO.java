package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.StudentAnswerQuestion} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentAnswerQuestionDTO implements Serializable {

    private Long id;

    private Boolean isCorrect;

    private QuestionDTO question;

    private OptionDTO option;

    private QuizSessionDTO quizSession;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setIsCorrect(Boolean isCorrect) {
        this.isCorrect = isCorrect;
    }

    public QuestionDTO getQuestion() {
        return question;
    }

    public void setQuestion(QuestionDTO question) {
        this.question = question;
    }

    public OptionDTO getOption() {
        return option;
    }

    public void setOption(OptionDTO option) {
        this.option = option;
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
        if (!(o instanceof StudentAnswerQuestionDTO)) {
            return false;
        }

        StudentAnswerQuestionDTO studentAnswerQuestionDTO = (StudentAnswerQuestionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, studentAnswerQuestionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentAnswerQuestionDTO{" +
            "id=" + getId() +
            ", isCorrect='" + getIsCorrect() + "'" +
            ", question=" + getQuestion() +
            ", option=" + getOption() +
            ", quizSession=" + getQuizSession() +
            "}";
    }
}
