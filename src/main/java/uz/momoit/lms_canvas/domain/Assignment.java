package uz.momoit.lms_canvas.domain;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uz.momoit.lms_canvas.domain.enumeration.SubmissionTypeEnum;

/**
 * A Assignment.
 */
@Entity
@Table(name = "assignment")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Assignment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "content")
    private String content;

    @Column(name = "points")
    private Float points;

    @Enumerated(EnumType.STRING)
    @Column(name = "submission_type")
    private SubmissionTypeEnum submissionType;

    @Column(name = "allowed_attempts")
    private Integer allowedAttempts;

    @Column(name = "published")
    private Boolean published;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Assignment id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Assignment name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContent() {
        return this.content;
    }

    public Assignment content(String content) {
        this.setContent(content);
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Float getPoints() {
        return this.points;
    }

    public Assignment points(Float points) {
        this.setPoints(points);
        return this;
    }

    public void setPoints(Float points) {
        this.points = points;
    }

    public SubmissionTypeEnum getSubmissionType() {
        return this.submissionType;
    }

    public Assignment submissionType(SubmissionTypeEnum submissionType) {
        this.setSubmissionType(submissionType);
        return this;
    }

    public void setSubmissionType(SubmissionTypeEnum submissionType) {
        this.submissionType = submissionType;
    }

    public Integer getAllowedAttempts() {
        return this.allowedAttempts;
    }

    public Assignment allowedAttempts(Integer allowedAttempts) {
        this.setAllowedAttempts(allowedAttempts);
        return this;
    }

    public void setAllowedAttempts(Integer allowedAttempts) {
        this.allowedAttempts = allowedAttempts;
    }

    public Boolean getPublished() {
        return this.published;
    }

    public Assignment published(Boolean published) {
        this.setPublished(published);
        return this;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Assignment)) {
            return false;
        }
        return getId() != null && getId().equals(((Assignment) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Assignment{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", content='" + getContent() + "'" +
            ", points=" + getPoints() +
            ", submissionType='" + getSubmissionType() + "'" +
            ", allowedAttempts=" + getAllowedAttempts() +
            ", published='" + getPublished() + "'" +
            "}";
    }
}
