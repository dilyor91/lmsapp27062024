package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A StudyAcademicYear.
 */
@Entity
@Table(name = "study_academic_year")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudyAcademicYear implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "from_date")
    private Instant fromDate;

    @Column(name = "end_date")
    private Instant endDate;

    @JsonIgnoreProperties(value = { "studyAcademicYear", "user", "faculty", "speciality", "group" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "studyAcademicYear")
    private Student student;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public StudyAcademicYear id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getFromDate() {
        return this.fromDate;
    }

    public StudyAcademicYear fromDate(Instant fromDate) {
        this.setFromDate(fromDate);
        return this;
    }

    public void setFromDate(Instant fromDate) {
        this.fromDate = fromDate;
    }

    public Instant getEndDate() {
        return this.endDate;
    }

    public StudyAcademicYear endDate(Instant endDate) {
        this.setEndDate(endDate);
        return this;
    }

    public void setEndDate(Instant endDate) {
        this.endDate = endDate;
    }

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        if (this.student != null) {
            this.student.setStudyAcademicYear(null);
        }
        if (student != null) {
            student.setStudyAcademicYear(this);
        }
        this.student = student;
    }

    public StudyAcademicYear student(Student student) {
        this.setStudent(student);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudyAcademicYear)) {
            return false;
        }
        return getId() != null && getId().equals(((StudyAcademicYear) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudyAcademicYear{" +
            "id=" + getId() +
            ", fromDate='" + getFromDate() + "'" +
            ", endDate='" + getEndDate() + "'" +
            "}";
    }
}
