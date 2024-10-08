package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.AnnouncementCourseSectionDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.AnnouncementCourseSection}.
 */
public interface AnnouncementCourseSectionService {
    /**
     * Save a announcementCourseSection.
     *
     * @param announcementCourseSectionDTO the entity to save.
     * @return the persisted entity.
     */
    AnnouncementCourseSectionDTO save(AnnouncementCourseSectionDTO announcementCourseSectionDTO);

    /**
     * Updates a announcementCourseSection.
     *
     * @param announcementCourseSectionDTO the entity to update.
     * @return the persisted entity.
     */
    AnnouncementCourseSectionDTO update(AnnouncementCourseSectionDTO announcementCourseSectionDTO);

    /**
     * Partially updates a announcementCourseSection.
     *
     * @param announcementCourseSectionDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<AnnouncementCourseSectionDTO> partialUpdate(AnnouncementCourseSectionDTO announcementCourseSectionDTO);

    /**
     * Get all the announcementCourseSections.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AnnouncementCourseSectionDTO> findAll(Pageable pageable);

    /**
     * Get the "id" announcementCourseSection.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AnnouncementCourseSectionDTO> findOne(Long id);

    /**
     * Delete the "id" announcementCourseSection.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
