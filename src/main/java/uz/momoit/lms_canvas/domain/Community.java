package uz.momoit.lms_canvas.domain;

import jakarta.persistence.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Community.
 */
@Entity
@Table(name = "community")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Community implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "title")
    private String title;

    @Column(name = "body")
    private String body;

    @Column(name = "set_as_anonymous")
    private Boolean setAsAnonymous;

    @Column(name = "only_me")
    private Boolean onlyMe;

    @Column(name = "to_all_students")
    private Boolean toAllStudents;

    @Column(name = "status")
    private Boolean status;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Community id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return this.title;
    }

    public Community title(String title) {
        this.setTitle(title);
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return this.body;
    }

    public Community body(String body) {
        this.setBody(body);
        return this;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Boolean getSetAsAnonymous() {
        return this.setAsAnonymous;
    }

    public Community setAsAnonymous(Boolean setAsAnonymous) {
        this.setSetAsAnonymous(setAsAnonymous);
        return this;
    }

    public void setSetAsAnonymous(Boolean setAsAnonymous) {
        this.setAsAnonymous = setAsAnonymous;
    }

    public Boolean getOnlyMe() {
        return this.onlyMe;
    }

    public Community onlyMe(Boolean onlyMe) {
        this.setOnlyMe(onlyMe);
        return this;
    }

    public void setOnlyMe(Boolean onlyMe) {
        this.onlyMe = onlyMe;
    }

    public Boolean getToAllStudents() {
        return this.toAllStudents;
    }

    public Community toAllStudents(Boolean toAllStudents) {
        this.setToAllStudents(toAllStudents);
        return this;
    }

    public void setToAllStudents(Boolean toAllStudents) {
        this.toAllStudents = toAllStudents;
    }

    public Boolean getStatus() {
        return this.status;
    }

    public Community status(Boolean status) {
        this.setStatus(status);
        return this;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Community user(User user) {
        this.setUser(user);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Community)) {
            return false;
        }
        return getId() != null && getId().equals(((Community) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Community{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", body='" + getBody() + "'" +
            ", setAsAnonymous='" + getSetAsAnonymous() + "'" +
            ", onlyMe='" + getOnlyMe() + "'" +
            ", toAllStudents='" + getToAllStudents() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
