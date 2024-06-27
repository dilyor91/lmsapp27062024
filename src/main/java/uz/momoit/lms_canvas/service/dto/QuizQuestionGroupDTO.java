package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.QuizQuestionGroup} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuizQuestionGroupDTO implements Serializable {

    private Long id;

    private Integer questionCount;

    private QuizDTO quiz;

    private QuestionGroupDTO questionGroup;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuestionCount() {
        return questionCount;
    }

    public void setQuestionCount(Integer questionCount) {
        this.questionCount = questionCount;
    }

    public QuizDTO getQuiz() {
        return quiz;
    }

    public void setQuiz(QuizDTO quiz) {
        this.quiz = quiz;
    }

    public QuestionGroupDTO getQuestionGroup() {
        return questionGroup;
    }

    public void setQuestionGroup(QuestionGroupDTO questionGroup) {
        this.questionGroup = questionGroup;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuizQuestionGroupDTO)) {
            return false;
        }

        QuizQuestionGroupDTO quizQuestionGroupDTO = (QuizQuestionGroupDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, quizQuestionGroupDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuizQuestionGroupDTO{" +
            "id=" + getId() +
            ", questionCount=" + getQuestionCount() +
            ", quiz=" + getQuiz() +
            ", questionGroup=" + getQuestionGroup() +
            "}";
    }
}
