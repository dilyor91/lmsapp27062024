package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.CommunityMessage} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CommunityMessageDTO implements Serializable {

    private Long id;

    private String message;

    private Instant senderDate;

    private CommunityDTO community;

    private UserDTO sender;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Instant getSenderDate() {
        return senderDate;
    }

    public void setSenderDate(Instant senderDate) {
        this.senderDate = senderDate;
    }

    public CommunityDTO getCommunity() {
        return community;
    }

    public void setCommunity(CommunityDTO community) {
        this.community = community;
    }

    public UserDTO getSender() {
        return sender;
    }

    public void setSender(UserDTO sender) {
        this.sender = sender;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommunityMessageDTO)) {
            return false;
        }

        CommunityMessageDTO communityMessageDTO = (CommunityMessageDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, communityMessageDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommunityMessageDTO{" +
            "id=" + getId() +
            ", message='" + getMessage() + "'" +
            ", senderDate='" + getSenderDate() + "'" +
            ", community=" + getCommunity() +
            ", sender=" + getSender() +
            "}";
    }
}
