package uz.momoit.lms_canvas.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.momoit.lms_canvas.repository.AnnouncementCourseSectionRepository;
import uz.momoit.lms_canvas.service.AnnouncementCourseSectionService;
import uz.momoit.lms_canvas.service.dto.AnnouncementCourseSectionDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.AnnouncementCourseSection}.
 */
@RestController
@RequestMapping("/api/announcement-course-sections")
public class AnnouncementCourseSectionResource {

    private static final Logger LOG = LoggerFactory.getLogger(AnnouncementCourseSectionResource.class);

    private static final String ENTITY_NAME = "announcementCourseSection";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnnouncementCourseSectionService announcementCourseSectionService;

    private final AnnouncementCourseSectionRepository announcementCourseSectionRepository;

    public AnnouncementCourseSectionResource(
        AnnouncementCourseSectionService announcementCourseSectionService,
        AnnouncementCourseSectionRepository announcementCourseSectionRepository
    ) {
        this.announcementCourseSectionService = announcementCourseSectionService;
        this.announcementCourseSectionRepository = announcementCourseSectionRepository;
    }

    /**
     * {@code POST  /announcement-course-sections} : Create a new announcementCourseSection.
     *
     * @param announcementCourseSectionDTO the announcementCourseSectionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new announcementCourseSectionDTO, or with status {@code 400 (Bad Request)} if the announcementCourseSection has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AnnouncementCourseSectionDTO> createAnnouncementCourseSection(
        @RequestBody AnnouncementCourseSectionDTO announcementCourseSectionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to save AnnouncementCourseSection : {}", announcementCourseSectionDTO);
        if (announcementCourseSectionDTO.getId() != null) {
            throw new BadRequestAlertException("A new announcementCourseSection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        announcementCourseSectionDTO = announcementCourseSectionService.save(announcementCourseSectionDTO);
        return ResponseEntity.created(new URI("/api/announcement-course-sections/" + announcementCourseSectionDTO.getId()))
            .headers(
                HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, announcementCourseSectionDTO.getId().toString())
            )
            .body(announcementCourseSectionDTO);
    }

    /**
     * {@code PUT  /announcement-course-sections/:id} : Updates an existing announcementCourseSection.
     *
     * @param id the id of the announcementCourseSectionDTO to save.
     * @param announcementCourseSectionDTO the announcementCourseSectionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated announcementCourseSectionDTO,
     * or with status {@code 400 (Bad Request)} if the announcementCourseSectionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the announcementCourseSectionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementCourseSectionDTO> updateAnnouncementCourseSection(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AnnouncementCourseSectionDTO announcementCourseSectionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update AnnouncementCourseSection : {}, {}", id, announcementCourseSectionDTO);
        if (announcementCourseSectionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, announcementCourseSectionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!announcementCourseSectionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        announcementCourseSectionDTO = announcementCourseSectionService.update(announcementCourseSectionDTO);
        return ResponseEntity.ok()
            .headers(
                HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, announcementCourseSectionDTO.getId().toString())
            )
            .body(announcementCourseSectionDTO);
    }

    /**
     * {@code PATCH  /announcement-course-sections/:id} : Partial updates given fields of an existing announcementCourseSection, field will ignore if it is null
     *
     * @param id the id of the announcementCourseSectionDTO to save.
     * @param announcementCourseSectionDTO the announcementCourseSectionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated announcementCourseSectionDTO,
     * or with status {@code 400 (Bad Request)} if the announcementCourseSectionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the announcementCourseSectionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the announcementCourseSectionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AnnouncementCourseSectionDTO> partialUpdateAnnouncementCourseSection(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AnnouncementCourseSectionDTO announcementCourseSectionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update AnnouncementCourseSection partially : {}, {}", id, announcementCourseSectionDTO);
        if (announcementCourseSectionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, announcementCourseSectionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!announcementCourseSectionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AnnouncementCourseSectionDTO> result = announcementCourseSectionService.partialUpdate(announcementCourseSectionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, announcementCourseSectionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /announcement-course-sections} : get all the announcementCourseSections.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of announcementCourseSections in body.
     */
    @GetMapping("")
    public ResponseEntity<List<AnnouncementCourseSectionDTO>> getAllAnnouncementCourseSections(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of AnnouncementCourseSections");
        Page<AnnouncementCourseSectionDTO> page = announcementCourseSectionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /announcement-course-sections/:id} : get the "id" announcementCourseSection.
     *
     * @param id the id of the announcementCourseSectionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the announcementCourseSectionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementCourseSectionDTO> getAnnouncementCourseSection(@PathVariable("id") Long id) {
        LOG.debug("REST request to get AnnouncementCourseSection : {}", id);
        Optional<AnnouncementCourseSectionDTO> announcementCourseSectionDTO = announcementCourseSectionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(announcementCourseSectionDTO);
    }

    /**
     * {@code DELETE  /announcement-course-sections/:id} : delete the "id" announcementCourseSection.
     *
     * @param id the id of the announcementCourseSectionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncementCourseSection(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete AnnouncementCourseSection : {}", id);
        announcementCourseSectionService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
