package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.MessageToUser} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MessageToUserDTO implements Serializable {

    private Long id;

    private Boolean read;

    private Instant readAt;

    private Boolean deleted;

    private MessageDTO message;

    private UserDTO receiver;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getRead() {
        return read;
    }

    public void setRead(Boolean read) {
        this.read = read;
    }

    public Instant getReadAt() {
        return readAt;
    }

    public void setReadAt(Instant readAt) {
        this.readAt = readAt;
    }

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }

    public MessageDTO getMessage() {
        return message;
    }

    public void setMessage(MessageDTO message) {
        this.message = message;
    }

    public UserDTO getReceiver() {
        return receiver;
    }

    public void setReceiver(UserDTO receiver) {
        this.receiver = receiver;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MessageToUserDTO)) {
            return false;
        }

        MessageToUserDTO messageToUserDTO = (MessageToUserDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, messageToUserDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MessageToUserDTO{" +
            "id=" + getId() +
            ", read='" + getRead() + "'" +
            ", readAt='" + getReadAt() + "'" +
            ", deleted='" + getDeleted() + "'" +
            ", message=" + getMessage() +
            ", receiver=" + getReceiver() +
            "}";
    }
}
