package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.CommunityAttachment} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CommunityAttachmentDTO implements Serializable {

    private Long id;

    private CommunityDTO community;

    private AttachmentDTO attachment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public CommunityDTO getCommunity() {
        return community;
    }

    public void setCommunity(CommunityDTO community) {
        this.community = community;
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
        if (!(o instanceof CommunityAttachmentDTO)) {
            return false;
        }

        CommunityAttachmentDTO communityAttachmentDTO = (CommunityAttachmentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, communityAttachmentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommunityAttachmentDTO{" +
            "id=" + getId() +
            ", community=" + getCommunity() +
            ", attachment=" + getAttachment() +
            "}";
    }
}
