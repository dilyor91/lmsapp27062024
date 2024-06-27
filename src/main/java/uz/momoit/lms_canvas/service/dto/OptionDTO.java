package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Option} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OptionDTO implements Serializable {

    private Long id;

    @NotNull
    private String optionText;

    @NotNull
    private Boolean isCorrect;

    private QuestionDTO question;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getOptionText() {
        return optionText;
    }

    public void setOptionText(String optionText) {
        this.optionText = optionText;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OptionDTO)) {
            return false;
        }

        OptionDTO optionDTO = (OptionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, optionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OptionDTO{" +
            "id=" + getId() +
            ", optionText='" + getOptionText() + "'" +
            ", isCorrect='" + getIsCorrect() + "'" +
            ", question=" + getQuestion() +
            "}";
    }
}
