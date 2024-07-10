package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A SubmissionAssignment.
 */
@Entity
@Table(name = "submission_assignment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SubmissionAssignment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "submission_date")
    private Instant submissionDate;

    @Column(name = "content")
    private String content;

    @Column(name = "comment")
    private String comment;

    @Column(name = "attemps_number")
    private Integer attempsNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "studyAcademicYear", "user", "faculty", "speciality", "group" }, allowSetters = true)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user", "courseWeekInfo" }, allowSetters = true)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    private Assignment assignment;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "lessonMaterial" }, allowSetters = true)
    private Attachment attachment;

    @JsonIgnoreProperties(value = { "submissionAssignment", "teacher", "assignment" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY, mappedBy = "submissionAssignment")
    private Grade grade;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public SubmissionAssignment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getSubmissionDate() {
        return this.submissionDate;
    }

    public SubmissionAssignment submissionDate(Instant submissionDate) {
        this.setSubmissionDate(submissionDate);
        return this;
    }

    public void setSubmissionDate(Instant submissionDate) {
        this.submissionDate = submissionDate;
    }

    public String getContent() {
        return this.content;
    }

    public SubmissionAssignment content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getComment() {
        return this.comment;
    }

    public SubmissionAssignment comment(String comment) {
        this.setComment(comment);
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Integer getAttempsNumber() {
        return this.attempsNumber;
    }

    public SubmissionAssignment attempsNumber(Integer attempsNumber) {
        this.setAttempsNumber(attempsNumber);
        return this;
    }

    public void setAttempsNumber(Integer attempsNumber) {
        this.attempsNumber = attempsNumber;
    }

    public Student getStudent() {
        return this.student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public SubmissionAssignment student(Student student) {
        this.setStudent(student);
        return this;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public SubmissionAssignment course(Course course) {
        this.setCourse(course);
        return this;
    }

    public Assignment getAssignment() {
        return this.assignment;
    }

    public void setAssignment(Assignment assignment) {
        this.assignment = assignment;
    }

    public SubmissionAssignment assignment(Assignment assignment) {
        this.setAssignment(assignment);
        return this;
    }

    public Attachment getAttachment() {
        return this.attachment;
    }

    public void setAttachment(Attachment attachment) {
        this.attachment = attachment;
    }

    public SubmissionAssignment attachment(Attachment attachment) {
        this.setAttachment(attachment);
        return this;
    }

    public Grade getGrade() {
        return this.grade;
    }

    public void setGrade(Grade grade) {
        if (this.grade != null) {
            this.grade.setSubmissionAssignment(null);
        }
        if (grade != null) {
            grade.setSubmissionAssignment(this);
        }
        this.grade = grade;
    }

    public SubmissionAssignment grade(Grade grade) {
        this.setGrade(grade);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubmissionAssignment)) {
            return false;
        }
        return getId() != null && getId().equals(((SubmissionAssignment) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubmissionAssignment{" +
            "id=" + getId() +
            ", submissionDate='" + getSubmissionDate() + "'" +
            ", content='" + getContent() + "'" +
            ", comment='" + getComment() + "'" +
            ", attempsNumber=" + getAttempsNumber() +
            "}";
    }
}
