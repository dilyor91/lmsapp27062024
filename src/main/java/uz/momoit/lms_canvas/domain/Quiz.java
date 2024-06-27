package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Quiz.
 */
@Entity
@Table(name = "quiz")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Quiz implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "quiz_name", nullable = false)
    private String quizName;

    @NotNull
    @Column(name = "time_in_minute", nullable = false)
    private Integer timeInMinute;

    @Column(name = "published")
    private Boolean published;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user" }, allowSetters = true)
    private Course course;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Quiz id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuizName() {
        return this.quizName;
    }

    public Quiz quizName(String quizName) {
        this.setQuizName(quizName);
        return this;
    }

    public void setQuizName(String quizName) {
        this.quizName = quizName;
    }

    public Integer getTimeInMinute() {
        return this.timeInMinute;
    }

    public Quiz timeInMinute(Integer timeInMinute) {
        this.setTimeInMinute(timeInMinute);
        return this;
    }

    public void setTimeInMinute(Integer timeInMinute) {
        this.timeInMinute = timeInMinute;
    }

    public Boolean getPublished() {
        return this.published;
    }

    public Quiz published(Boolean published) {
        this.setPublished(published);
        return this;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Quiz course(Course course) {
        this.setCourse(course);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Quiz)) {
            return false;
        }
        return getId() != null && getId().equals(((Quiz) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Quiz{" +
            "id=" + getId() +
            ", quizName='" + getQuizName() + "'" +
            ", timeInMinute=" + getTimeInMinute() +
            ", published='" + getPublished() + "'" +
            "}";
    }
}
