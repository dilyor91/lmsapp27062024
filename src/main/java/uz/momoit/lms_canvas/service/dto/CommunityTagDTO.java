package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.CommunityTag} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CommunityTagDTO implements Serializable {

    private Long id;

    private CommunityDTO community;

    private TagDTO tag;

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

    public TagDTO getTag() {
        return tag;
    }

    public void setTag(TagDTO tag) {
        this.tag = tag;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommunityTagDTO)) {
            return false;
        }

        CommunityTagDTO communityTagDTO = (CommunityTagDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, communityTagDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommunityTagDTO{" +
            "id=" + getId() +
            ", community=" + getCommunity() +
            ", tag=" + getTag() +
            "}";
    }
}
