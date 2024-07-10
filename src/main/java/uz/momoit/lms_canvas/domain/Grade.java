package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Grade.
 */
@Entity
@Table(name = "grade")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Grade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "point")
    private Integer point;

    @Column(name = "graded_date")
    private Instant gradedDate;

    @JsonIgnoreProperties(value = { "student", "course", "assignment", "attachment", "grade" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private SubmissionAssignment submissionAssignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user", "faculty", "department" }, allowSetters = true)
    private Teacher teacher;

    @ManyToOne(fetch = FetchType.LAZY)
    private Assignment assignment;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Grade id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getPoint() {
        return this.point;
    }

    public Grade point(Integer point) {
        this.setPoint(point);
        return this;
    }

    public void setPoint(Integer point) {
        this.point = point;
    }

    public Instant getGradedDate() {
        return this.gradedDate;
    }

    public Grade gradedDate(Instant gradedDate) {
        this.setGradedDate(gradedDate);
        return this;
    }

    public void setGradedDate(Instant gradedDate) {
        this.gradedDate = gradedDate;
    }

    public SubmissionAssignment getSubmissionAssignment() {
        return this.submissionAssignment;
    }

    public void setSubmissionAssignment(SubmissionAssignment submissionAssignment) {
        this.submissionAssignment = submissionAssignment;
    }

    public Grade submissionAssignment(SubmissionAssignment submissionAssignment) {
        this.setSubmissionAssignment(submissionAssignment);
        return this;
    }

    public Teacher getTeacher() {
        return this.teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Grade teacher(Teacher teacher) {
        this.setTeacher(teacher);
        return this;
    }

    public Assignment getAssignment() {
        return this.assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public Grade assignment(Assignment assignment) {
        this.setAssignment(assignment);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Grade)) {
            return false;
        }
        return getId() != null && getId().equals(((Grade) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Grade{" +
            "id=" + getId() +
            ", point=" + getPoint() +
            ", gradedDate='" + getGradedDate() + "'" +
            "}";
    }
}
