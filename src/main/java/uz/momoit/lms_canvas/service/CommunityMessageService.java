package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.CommunityMessageDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.CommunityMessage}.
 */
public interface CommunityMessageService {
    /**
     * Save a communityMessage.
     *
     * @param communityMessageDTO the entity to save.
     * @return the persisted entity.
     */
    CommunityMessageDTO save(CommunityMessageDTO communityMessageDTO);

    /**
     * Updates a communityMessage.
     *
     * @param communityMessageDTO the entity to update.
     * @return the persisted entity.
     */
    CommunityMessageDTO update(CommunityMessageDTO communityMessageDTO);

    /**
     * Partially updates a communityMessage.
     *
     * @param communityMessageDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CommunityMessageDTO> partialUpdate(CommunityMessageDTO communityMessageDTO);

    /**
     * Get all the communityMessages.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CommunityMessageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" communityMessage.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommunityMessageDTO> findOne(Long id);

    /**
     * Delete the "id" communityMessage.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
