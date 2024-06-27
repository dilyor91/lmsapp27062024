package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.StudentOption} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentOptionDTO implements Serializable {

    private Long id;

    private Integer ordNum;

    private StudentQuestionDTO studentQuestion;

    private OptionDTO option;

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

    public StudentQuestionDTO getStudentQuestion() {
        return studentQuestion;
    }

    public void setStudentQuestion(StudentQuestionDTO studentQuestion) {
        this.studentQuestion = studentQuestion;
    }

    public OptionDTO getOption() {
        return option;
    }

    public void setOption(OptionDTO option) {
        this.option = option;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentOptionDTO)) {
            return false;
        }

        StudentOptionDTO studentOptionDTO = (StudentOptionDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, studentOptionDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentOptionDTO{" +
            "id=" + getId() +
            ", ordNum=" + getOrdNum() +
            ", studentQuestion=" + getStudentQuestion() +
            ", option=" + getOption() +
            "}";
    }
}
