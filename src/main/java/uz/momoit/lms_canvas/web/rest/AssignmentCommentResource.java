package uz.momoit.lms_canvas.web.rest;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
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
import uz.momoit.lms_canvas.repository.AssignmentCommentRepository;
import uz.momoit.lms_canvas.service.AssignmentCommentService;
import uz.momoit.lms_canvas.service.dto.AssignmentCommentDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.AssignmentComment}.
 */
@RestController
@RequestMapping("/api/assignment-comments")
public class AssignmentCommentResource {

    private static final Logger LOG = LoggerFactory.getLogger(AssignmentCommentResource.class);

    private static final String ENTITY_NAME = "assignmentComment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AssignmentCommentService assignmentCommentService;

    private final AssignmentCommentRepository assignmentCommentRepository;

    public AssignmentCommentResource(
        AssignmentCommentService assignmentCommentService,
        AssignmentCommentRepository assignmentCommentRepository
    ) {
        this.assignmentCommentService = assignmentCommentService;
        this.assignmentCommentRepository = assignmentCommentRepository;
    }

    /**
     * {@code POST  /assignment-comments} : Create a new assignmentComment.
     *
     * @param assignmentCommentDTO the assignmentCommentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new assignmentCommentDTO, or with status {@code 400 (Bad Request)} if the assignmentComment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AssignmentCommentDTO> createAssignmentComment(@Valid @RequestBody AssignmentCommentDTO assignmentCommentDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save AssignmentComment : {}", assignmentCommentDTO);
        if (assignmentCommentDTO.getId() != null) {
            throw new BadRequestAlertException("A new assignmentComment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        assignmentCommentDTO = assignmentCommentService.save(assignmentCommentDTO);
        return ResponseEntity.created(new URI("/api/assignment-comments/" + assignmentCommentDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, assignmentCommentDTO.getId().toString()))
            .body(assignmentCommentDTO);
    }

    /**
     * {@code PUT  /assignment-comments/:id} : Updates an existing assignmentComment.
     *
     * @param id the id of the assignmentCommentDTO to save.
     * @param assignmentCommentDTO the assignmentCommentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assignmentCommentDTO,
     * or with status {@code 400 (Bad Request)} if the assignmentCommentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the assignmentCommentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AssignmentCommentDTO> updateAssignmentComment(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody AssignmentCommentDTO assignmentCommentDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update AssignmentComment : {}, {}", id, assignmentCommentDTO);
        if (assignmentCommentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, assignmentCommentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!assignmentCommentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        assignmentCommentDTO = assignmentCommentService.update(assignmentCommentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignmentCommentDTO.getId().toString()))
            .body(assignmentCommentDTO);
    }

    /**
     * {@code PATCH  /assignment-comments/:id} : Partial updates given fields of an existing assignmentComment, field will ignore if it is null
     *
     * @param id the id of the assignmentCommentDTO to save.
     * @param assignmentCommentDTO the assignmentCommentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated assignmentCommentDTO,
     * or with status {@code 400 (Bad Request)} if the assignmentCommentDTO is not valid,
     * or with status {@code 404 (Not Found)} if the assignmentCommentDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the assignmentCommentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AssignmentCommentDTO> partialUpdateAssignmentComment(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody AssignmentCommentDTO assignmentCommentDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update AssignmentComment partially : {}, {}", id, assignmentCommentDTO);
        if (assignmentCommentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, assignmentCommentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!assignmentCommentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AssignmentCommentDTO> result = assignmentCommentService.partialUpdate(assignmentCommentDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, assignmentCommentDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /assignment-comments} : get all the assignmentComments.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of assignmentComments in body.
     */
    @GetMapping("")
    public ResponseEntity<List<AssignmentCommentDTO>> getAllAssignmentComments(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of AssignmentComments");
        Page<AssignmentCommentDTO> page = assignmentCommentService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /assignment-comments/:id} : get the "id" assignmentComment.
     *
     * @param id the id of the assignmentCommentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the assignmentCommentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AssignmentCommentDTO> getAssignmentComment(@PathVariable("id") Long id) {
        LOG.debug("REST request to get AssignmentComment : {}", id);
        Optional<AssignmentCommentDTO> assignmentCommentDTO = assignmentCommentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(assignmentCommentDTO);
    }

    /**
     * {@code DELETE  /assignment-comments/:id} : delete the "id" assignmentComment.
     *
     * @param id the id of the assignmentCommentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignmentComment(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete AssignmentComment : {}", id);
        assignmentCommentService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
