package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Community} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CommunityDTO implements Serializable {

    private Long id;

    private String title;

    private String body;

    private Boolean setAsAnonymous;

    private Boolean onlyMe;

    private Boolean toAllStudents;

    private Boolean status;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public Boolean getSetAsAnonymous() {
        return setAsAnonymous;
    }

    public void setSetAsAnonymous(Boolean setAsAnonymous) {
        this.setAsAnonymous = setAsAnonymous;
    }

    public Boolean getOnlyMe() {
        return onlyMe;
    }

    public void setOnlyMe(Boolean onlyMe) {
        this.onlyMe = onlyMe;
    }

    public Boolean getToAllStudents() {
        return toAllStudents;
    }

    public void setToAllStudents(Boolean toAllStudents) {
        this.toAllStudents = toAllStudents;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommunityDTO)) {
            return false;
        }

        CommunityDTO communityDTO = (CommunityDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, communityDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommunityDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", body='" + getBody() + "'" +
            ", setAsAnonymous='" + getSetAsAnonymous() + "'" +
            ", onlyMe='" + getOnlyMe() + "'" +
            ", toAllStudents='" + getToAllStudents() + "'" +
            ", status='" + getStatus() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
