package uz.momoit.lms_canvas.service;

import java.util.List;
import java.util.Optional;
import uz.momoit.lms_canvas.service.dto.MessageToUserDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.MessageToUser}.
 */
public interface MessageToUserService {
    /**
     * Save a messageToUser.
     *
     * @param messageToUserDTO the entity to save.
     * @return the persisted entity.
     */
    MessageToUserDTO save(MessageToUserDTO messageToUserDTO);

    /**
     * Updates a messageToUser.
     *
     * @param messageToUserDTO the entity to update.
     * @return the persisted entity.
     */
    MessageToUserDTO update(MessageToUserDTO messageToUserDTO);

    /**
     * Partially updates a messageToUser.
     *
     * @param messageToUserDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<MessageToUserDTO> partialUpdate(MessageToUserDTO messageToUserDTO);

    /**
     * Get all the messageToUsers.
     *
     * @return the list of entities.
     */
    List<MessageToUserDTO> findAll();

    /**
     * Get the "id" messageToUser.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<MessageToUserDTO> findOne(Long id);

    /**
     * Delete the "id" messageToUser.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
