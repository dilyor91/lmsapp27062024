package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A QuizResult.
 */
@Entity
@Table(name = "quiz_result")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class QuizResult implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "point")
    private Integer point;

    @Column(name = "total_question_cnt")
    private Integer totalQuestionCnt;

    @Column(name = "correct_answer_cnt")
    private Integer correctAnswerCnt;

    @Column(name = "wrong_answer_cnt")
    private Integer wrongAnswerCnt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "course" }, allowSetters = true)
    private Quiz quiz;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "studyAcademicYear", "user", "faculty", "speciality", "group" }, allowSetters = true)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "student", "quiz" }, allowSetters = true)
    private QuizSession quizSession;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public QuizResult id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPoint() {
        return this.point;
    }

    public QuizResult point(Integer point) {
        this.setPoint(point);
        return this;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Integer getTotalQuestionCnt() {
        return this.totalQuestionCnt;
    }

    public QuizResult totalQuestionCnt(Integer totalQuestionCnt) {
        this.setTotalQuestionCnt(totalQuestionCnt);
        return this;
    }

    public void setTotalQuestionCnt(Integer totalQuestionCnt) {
        this.totalQuestionCnt = totalQuestionCnt;
    }

    public Integer getCorrectAnswerCnt() {
        return this.correctAnswerCnt;
    }

    public QuizResult correctAnswerCnt(Integer correctAnswerCnt) {
        this.setCorrectAnswerCnt(correctAnswerCnt);
        return this;
    }

    public void setCorrectAnswerCnt(Integer correctAnswerCnt) {
        this.correctAnswerCnt = correctAnswerCnt;
    }

    public Integer getWrongAnswerCnt() {
        return this.wrongAnswerCnt;
    }

    public QuizResult wrongAnswerCnt(Integer wrongAnswerCnt) {
        this.setWrongAnswerCnt(wrongAnswerCnt);
        return this;
    }

    public void setWrongAnswerCnt(Integer wrongAnswerCnt) {
        this.wrongAnswerCnt = wrongAnswerCnt;
    }

    public Quiz getQuiz() {
        return this.quiz;
    }

    public void setQuiz(Quiz quiz) {
        this.quiz = quiz;
    }

    public QuizResult quiz(Quiz quiz) {
        this.setQuiz(quiz);
        return this;
    }

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public QuizResult student(Student student) {
        this.setStudent(student);
        return this;
    }

    public QuizSession getQuizSession() {
        return this.quizSession;
    }

    public void setQuizSession(QuizSession quizSession) {
        this.quizSession = quizSession;
    }

    public QuizResult quizSession(QuizSession quizSession) {
        this.setQuizSession(quizSession);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof QuizResult)) {
            return false;
        }
        return getId() != null && getId().equals(((QuizResult) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "QuizResult{" +
            "id=" + getId() +
            ", point=" + getPoint() +
            ", totalQuestionCnt=" + getTotalQuestionCnt() +
            ", correctAnswerCnt=" + getCorrectAnswerCnt() +
            ", wrongAnswerCnt=" + getWrongAnswerCnt() +
            "}";
    }
}
