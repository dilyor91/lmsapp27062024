package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A StudentQuestion.
 */
@Entity
@Table(name = "student_question")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentQuestion implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "ord_num")
    private Integer ordNum;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "student", "quiz" }, allowSetters = true)
    private QuizSession quizSession;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "questionGroup" }, allowSetters = true)
    private Question question;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public StudentQuestion id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getOrdNum() {
        return this.ordNum;
    }

    public StudentQuestion ordNum(Integer ordNum) {
        this.setOrdNum(ordNum);
        return this;
    }

    public void setOrdNum(Integer ordNum) {
        this.ordNum = ordNum;
    }

    public QuizSession getQuizSession() {
        return this.quizSession;
    }

    public void setQuizSession(QuizSession quizSession) {
        this.quizSession = quizSession;
    }

    public StudentQuestion quizSession(QuizSession quizSession) {
        this.setQuizSession(quizSession);
        return this;
    }

    public Question getQuestion() {
        return this.question;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public StudentQuestion question(Question question) {
        this.setQuestion(question);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentQuestion)) {
            return false;
        }
        return getId() != null && getId().equals(((StudentQuestion) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentQuestion{" +
            "id=" + getId() +
            ", ordNum=" + getOrdNum() +
            "}";
    }
}
