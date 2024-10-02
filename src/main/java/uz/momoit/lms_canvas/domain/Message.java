package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;
import java.time.Instant;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Message.
 */
@Entity
@Table(name = "message")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Message implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "subject")
    private String subject;

    @Column(name = "body")
    private String body;

    @Column(name = "to_all_course_students")
    private Boolean toAllCourseStudents;

    @Column(name = "to_section_ids")
    private String toSectionIds;

    @Column(name = "sender_date")
    private Instant senderDate;

    @Column(name = "deleted")
    private Boolean deleted;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "user", "courseWeekInfo" }, allowSetters = true)
    private Course course;

    @ManyToOne(fetch = FetchType.LAZY)
    private User sender;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Message id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSubject() {
        return this.subject;
    }

    public Message subject(String subject) {
        this.setSubject(subject);
        return this;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getBody() {
        return this.body;
    }

    public Message body(String body) {
        this.setBody(body);
        return this;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Boolean getToAllCourseStudents() {
        return this.toAllCourseStudents;
    }

    public Message toAllCourseStudents(Boolean toAllCourseStudents) {
        this.setToAllCourseStudents(toAllCourseStudents);
        return this;
    }

    public void setToAllCourseStudents(Boolean toAllCourseStudents) {
        this.toAllCourseStudents = toAllCourseStudents;
    }

    public String getToSectionIds() {
        return this.toSectionIds;
    }

    public Message toSectionIds(String toSectionIds) {
        this.setToSectionIds(toSectionIds);
        return this;
    }

    public void setToSectionIds(String toSectionIds) {
        this.toSectionIds = toSectionIds;
    }

    public Instant getSenderDate() {
        return this.senderDate;
    }

    public Message senderDate(Instant senderDate) {
        this.setSenderDate(senderDate);
        return this;
    }

    public void setSenderDate(Instant senderDate) {
        this.senderDate = senderDate;
    }

    public Boolean getDeleted() {
        return this.deleted;
    }

    public Message deleted(Boolean deleted) {
        this.setDeleted(deleted);
        return this;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public Course getCourse() {
        return this.course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Message course(Course course) {
        this.setCourse(course);
        return this;
    }

    public User getSender() {
        return this.sender;
    }

    public void setSender(User user) {
        this.sender = user;
    }

    public Message sender(User user) {
        this.setSender(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Message)) {
            return false;
        }
        return getId() != null && getId().equals(((Message) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Message{" +
            "id=" + getId() +
            ", subject='" + getSubject() + "'" +
            ", body='" + getBody() + "'" +
            ", toAllCourseStudents='" + getToAllCourseStudents() + "'" +
            ", toSectionIds='" + getToSectionIds() + "'" +
            ", senderDate='" + getSenderDate() + "'" +
            ", deleted='" + getDeleted() + "'" +
            "}";
    }
}
