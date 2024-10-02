package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.MessageAttachment} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class MessageAttachmentDTO implements Serializable {

    private Long id;

    private MessageDTO message;

    private AttachmentDTO attachment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public MessageDTO getMessage() {
        return message;
    }

    public void setMessage(MessageDTO message) {
        this.message = message;
    }

    public AttachmentDTO getAttachment() {
        return attachment;
    }

    public void setAttachment(AttachmentDTO attachment) {
        this.attachment = attachment;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof MessageAttachmentDTO)) {
            return false;
        }

        MessageAttachmentDTO messageAttachmentDTO = (MessageAttachmentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, messageAttachmentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "MessageAttachmentDTO{" +
            "id=" + getId() +
            ", message=" + getMessage() +
            ", attachment=" + getAttachment() +
            "}";
    }
}
