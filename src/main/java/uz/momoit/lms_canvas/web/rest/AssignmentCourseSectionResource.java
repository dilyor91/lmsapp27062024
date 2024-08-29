package uz.momoit.lms_canvas.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.momoit.lms_canvas.repository.AssignmentCourseSectionRepository;
import uz.momoit.lms_canvas.service.AssignmentCourseSectionService;
import uz.momoit.lms_canvas.service.dto.AssignmentCourseSectionDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.AssignmentCourseSection}.
 */
@RestController
@RequestMapping("/api/assignment-course-sections")
public class AssignmentCourseSectionResource {

    private static final Logger LOG = LoggerFactory.getLogger(AssignmentCourseSectionResource.class);

    private static final String ENTITY_NAME = "assignmentCourseSection";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AssignmentCourseSectionService assignmentCourseSectionService;

    private final AssignmentCourseSectionRepository assignmentCourseSectionRepository;

    public AssignmentCourseSectionResource(
        AssignmentCourseSectionService assignmentCourseSectionService,
        AssignmentCourseSectionRepository assignmentCourseSectionRepository
    ) {
        this.assignmentCourseSectionService = assignmentCourseSectionService;
        this.assignmentCourseSectionRepository = assignmentCourseSectionRepository;
    }

    /**
     * {@code POST  /assignment-course-sections} : Create a new assignmentCourseSection.
     *
     * @param assignmentCourseSectionDTO the assignmentCourseSectionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new assignmentCourseSectionDTO, or with status {@code 400 (Bad Request)} if the assignmentCourseSection has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AssignmentCourseSectionDTO> createAssignmentCourseSection(
        @RequestBody AssignmentCourseSectionDTO assignmentCourseSectionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to save AssignmentCourseSection : {}", assignmentCourseSectionDTO);
        if (assignmentCourseSectionDTO.getId() != null) {
            throw new BadRequestAlertException("A new assignmentCourseSection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        assignmentCourseSectionDTO = assignmentCourseSectionService.save(assignmentCourseSectionDTO);
        return ResponseEntity.created(new URI("/api/assignment-course-sections/" + assignmentCourseSectionDTO.getId()))
            .headers(
                HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, assignmentCourseSectionDTO.getId().toString())
            )
            .body(assignmentCourseSectionDTO);
    }

    /**
     * {@code PUT  /assignment-course-sections/:id} : Updates an existing assignmentCourseSection.
     *
     * @param id the id of the assignmentCourseSectionDTO to save.
     * @param assignmentCourseSectionDTO the assignmentCourseSectionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assignmentCourseSectionDTO,
     * or with status {@code 400 (Bad Request)} if the assignmentCourseSectionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the assignmentCourseSectionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AssignmentCourseSectionDTO> updateAssignmentCourseSection(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AssignmentCourseSectionDTO assignmentCourseSectionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update AssignmentCourseSection : {}, {}", id, assignmentCourseSectionDTO);
        if (assignmentCourseSectionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, assignmentCourseSectionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!assignmentCourseSectionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        assignmentCourseSectionDTO = assignmentCourseSectionService.update(assignmentCourseSectionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignmentCourseSectionDTO.getId().toString()))
            .body(assignmentCourseSectionDTO);
    }

    /**
     * {@code PATCH  /assignment-course-sections/:id} : Partial updates given fields of an existing assignmentCourseSection, field will ignore if it is null
     *
     * @param id the id of the assignmentCourseSectionDTO to save.
     * @param assignmentCourseSectionDTO the assignmentCourseSectionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assignmentCourseSectionDTO,
     * or with status {@code 400 (Bad Request)} if the assignmentCourseSectionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the assignmentCourseSectionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the assignmentCourseSectionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AssignmentCourseSectionDTO> partialUpdateAssignmentCourseSection(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AssignmentCourseSectionDTO assignmentCourseSectionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update AssignmentCourseSection partially : {}, {}", id, assignmentCourseSectionDTO);
        if (assignmentCourseSectionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, assignmentCourseSectionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!assignmentCourseSectionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AssignmentCourseSectionDTO> result = assignmentCourseSectionService.partialUpdate(assignmentCourseSectionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignmentCourseSectionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /assignment-course-sections} : get all the assignmentCourseSections.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of assignmentCourseSections in body.
     */
    @GetMapping("")
    public List<AssignmentCourseSectionDTO> getAllAssignmentCourseSections() {
        LOG.debug("REST request to get all AssignmentCourseSections");
        return assignmentCourseSectionService.findAll();
    }

    /**
     * {@code GET  /assignment-course-sections/:id} : get the "id" assignmentCourseSection.
     *
     * @param id the id of the assignmentCourseSectionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the assignmentCourseSectionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AssignmentCourseSectionDTO> getAssignmentCourseSection(@PathVariable("id") Long id) {
        LOG.debug("REST request to get AssignmentCourseSection : {}", id);
        Optional<AssignmentCourseSectionDTO> assignmentCourseSectionDTO = assignmentCourseSectionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(assignmentCourseSectionDTO);
    }

    /**
     * {@code DELETE  /assignment-course-sections/:id} : delete the "id" assignmentCourseSection.
     *
     * @param id the id of the assignmentCourseSectionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignmentCourseSection(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete AssignmentCourseSection : {}", id);
        assignmentCourseSectionService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
