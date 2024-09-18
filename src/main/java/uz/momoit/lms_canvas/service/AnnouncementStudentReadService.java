package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.AnnouncementStudentReadDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.AnnouncementStudentRead}.
 */
public interface AnnouncementStudentReadService {
    /**
     * Save a announcementStudentRead.
     *
     * @param announcementStudentReadDTO the entity to save.
     * @return the persisted entity.
     */
    AnnouncementStudentReadDTO save(AnnouncementStudentReadDTO announcementStudentReadDTO);

    /**
     * Updates a announcementStudentRead.
     *
     * @param announcementStudentReadDTO the entity to update.
     * @return the persisted entity.
     */
    AnnouncementStudentReadDTO update(AnnouncementStudentReadDTO announcementStudentReadDTO);

    /**
     * Partially updates a announcementStudentRead.
     *
     * @param announcementStudentReadDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AnnouncementStudentReadDTO> partialUpdate(AnnouncementStudentReadDTO announcementStudentReadDTO);

    /**
     * Get all the announcementStudentReads.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AnnouncementStudentReadDTO> findAll(Pageable pageable);

    /**
     * Get the "id" announcementStudentRead.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AnnouncementStudentReadDTO> findOne(Long id);

    /**
     * Delete the "id" announcementStudentRead.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
