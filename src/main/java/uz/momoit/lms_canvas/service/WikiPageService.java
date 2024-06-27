package uz.momoit.lms_canvas.service;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import uz.momoit.lms_canvas.service.dto.WikiPageDTO;

/**
 * Service Interface for managing {@link uz.momoit.lms_canvas.domain.WikiPage}.
 */
public interface WikiPageService {
    /**
     * Save a wikiPage.
     *
     * @param wikiPageDTO the entity to save.
     * @return the persisted entity.
     */
    WikiPageDTO save(WikiPageDTO wikiPageDTO);

    /**
     * Updates a wikiPage.
     *
     * @param wikiPageDTO the entity to update.
     * @return the persisted entity.
     */
    WikiPageDTO update(WikiPageDTO wikiPageDTO);

    /**
     * Partially updates a wikiPage.
     *
     * @param wikiPageDTO the entity to update partially.
     * @return the persisted entity.
     */
    Optional<WikiPageDTO> partialUpdate(WikiPageDTO wikiPageDTO);

    /**
     * Get all the wikiPages.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<WikiPageDTO> findAll(Pageable pageable);

    /**
     * Get the "id" wikiPage.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<WikiPageDTO> findOne(Long id);

    /**
     * Delete the "id" wikiPage.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
