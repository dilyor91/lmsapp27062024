package uz.momoit.lms_canvas.service;

import java.util.List;
import java.util.Optional;
import uz.momoit.lms_canvas.service.dto.CommunityTagDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.CommunityTag}.
 */
public interface CommunityTagService {
    /**
     * Save a communityTag.
     *
     * @param communityTagDTO the entity to save.
     * @return the persisted entity.
     */
    CommunityTagDTO save(CommunityTagDTO communityTagDTO);

    /**
     * Updates a communityTag.
     *
     * @param communityTagDTO the entity to update.
     * @return the persisted entity.
     */
    CommunityTagDTO update(CommunityTagDTO communityTagDTO);

    /**
     * Partially updates a communityTag.
     *
     * @param communityTagDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CommunityTagDTO> partialUpdate(CommunityTagDTO communityTagDTO);

    /**
     * Get all the communityTags.
     *
     * @return the list of entities.
     */
    List<CommunityTagDTO> findAll();

    /**
     * Get the "id" communityTag.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommunityTagDTO> findOne(Long id);

    /**
     * Delete the "id" communityTag.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
