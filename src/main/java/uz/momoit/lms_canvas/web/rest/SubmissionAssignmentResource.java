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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.momoit.lms_canvas.repository.SubmissionAssignmentRepository;
import uz.momoit.lms_canvas.service.SubmissionAssignmentService;
import uz.momoit.lms_canvas.service.dto.SubmissionAssignmentDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.SubmissionAssignment}.
 */
@RestController
@RequestMapping("/api/submission-assignments")
public class SubmissionAssignmentResource {

    private static final Logger log = LoggerFactory.getLogger(SubmissionAssignmentResource.class);

    private static final String ENTITY_NAME = "submissionAssignment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SubmissionAssignmentService submissionAssignmentService;

    private final SubmissionAssignmentRepository submissionAssignmentRepository;

    public SubmissionAssignmentResource(
        SubmissionAssignmentService submissionAssignmentService,
        SubmissionAssignmentRepository submissionAssignmentRepository
    ) {
        this.submissionAssignmentService = submissionAssignmentService;
        this.submissionAssignmentRepository = submissionAssignmentRepository;
    }

    /**
     * {@code POST  /submission-assignments} : Create a new submissionAssignment.
     *
     * @param submissionAssignmentDTO the submissionAssignmentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new submissionAssignmentDTO, or with status {@code 400 (Bad Request)} if the submissionAssignment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<SubmissionAssignmentDTO> createSubmissionAssignment(@RequestBody SubmissionAssignmentDTO submissionAssignmentDTO)
        throws URISyntaxException {
        log.debug("REST request to save SubmissionAssignment : {}", submissionAssignmentDTO);
        if (submissionAssignmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new submissionAssignment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        submissionAssignmentDTO = submissionAssignmentService.save(submissionAssignmentDTO);
        return ResponseEntity.created(new URI("/api/submission-assignments/" + submissionAssignmentDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, submissionAssignmentDTO.getId().toString()))
            .body(submissionAssignmentDTO);
    }

    /**
     * {@code PUT  /submission-assignments/:id} : Updates an existing submissionAssignment.
     *
     * @param id the id of the submissionAssignmentDTO to save.
     * @param submissionAssignmentDTO the submissionAssignmentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated submissionAssignmentDTO,
     * or with status {@code 400 (Bad Request)} if the submissionAssignmentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the submissionAssignmentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<SubmissionAssignmentDTO> updateSubmissionAssignment(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SubmissionAssignmentDTO submissionAssignmentDTO
    ) throws URISyntaxException {
        log.debug("REST request to update SubmissionAssignment : {}, {}", id, submissionAssignmentDTO);
        if (submissionAssignmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, submissionAssignmentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!submissionAssignmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        submissionAssignmentDTO = submissionAssignmentService.update(submissionAssignmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, submissionAssignmentDTO.getId().toString()))
            .body(submissionAssignmentDTO);
    }

    /**
     * {@code PATCH  /submission-assignments/:id} : Partial updates given fields of an existing submissionAssignment, field will ignore if it is null
     *
     * @param id the id of the submissionAssignmentDTO to save.
     * @param submissionAssignmentDTO the submissionAssignmentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated submissionAssignmentDTO,
     * or with status {@code 400 (Bad Request)} if the submissionAssignmentDTO is not valid,
     * or with status {@code 404 (Not Found)} if the submissionAssignmentDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the submissionAssignmentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<SubmissionAssignmentDTO> partialUpdateSubmissionAssignment(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody SubmissionAssignmentDTO submissionAssignmentDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update SubmissionAssignment partially : {}, {}", id, submissionAssignmentDTO);
        if (submissionAssignmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, submissionAssignmentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!submissionAssignmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<SubmissionAssignmentDTO> result = submissionAssignmentService.partialUpdate(submissionAssignmentDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, submissionAssignmentDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /submission-assignments} : get all the submissionAssignments.
     *
     * @param pageable the pagination information.
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of submissionAssignments in body.
     */
    @GetMapping("")
    public ResponseEntity<List<SubmissionAssignmentDTO>> getAllSubmissionAssignments(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "filter", required = false) String filter
    ) {
        if ("grade-is-null".equals(filter)) {
            log.debug("REST request to get all SubmissionAssignments where grade is null");
            return new ResponseEntity<>(submissionAssignmentService.findAllWhereGradeIsNull(), HttpStatus.OK);
        }
        log.debug("REST request to get a page of SubmissionAssignments");
        Page<SubmissionAssignmentDTO> page = submissionAssignmentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /submission-assignments/:id} : get the "id" submissionAssignment.
     *
     * @param id the id of the submissionAssignmentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the submissionAssignmentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<SubmissionAssignmentDTO> getSubmissionAssignment(@PathVariable("id") Long id) {
        log.debug("REST request to get SubmissionAssignment : {}", id);
        Optional<SubmissionAssignmentDTO> submissionAssignmentDTO = submissionAssignmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(submissionAssignmentDTO);
    }

    /**
     * {@code DELETE  /submission-assignments/:id} : delete the "id" submissionAssignment.
     *
     * @param id the id of the submissionAssignmentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSubmissionAssignment(@PathVariable("id") Long id) {
        log.debug("REST request to delete SubmissionAssignment : {}", id);
        submissionAssignmentService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
