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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.momoit.lms_canvas.repository.StudyTermRepository;
import uz.momoit.lms_canvas.service.StudyTermService;
import uz.momoit.lms_canvas.service.dto.StudyTermDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.StudyTerm}.
 */
@RestController
@RequestMapping("/api/study-terms")
public class StudyTermResource {

    private static final Logger log = LoggerFactory.getLogger(StudyTermResource.class);

    private static final String ENTITY_NAME = "studyTerm";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudyTermService studyTermService;

    private final StudyTermRepository studyTermRepository;

    public StudyTermResource(StudyTermService studyTermService, StudyTermRepository studyTermRepository) {
        this.studyTermService = studyTermService;
        this.studyTermRepository = studyTermRepository;
    }

    /**
     * {@code POST  /study-terms} : Create a new studyTerm.
     *
     * @param studyTermDTO the studyTermDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studyTermDTO, or with status {@code 400 (Bad Request)} if the studyTerm has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<StudyTermDTO> createStudyTerm(@Valid @RequestBody StudyTermDTO studyTermDTO) throws URISyntaxException {
        log.debug("REST request to save StudyTerm : {}", studyTermDTO);
        if (studyTermDTO.getId() != null) {
            throw new BadRequestAlertException("A new studyTerm cannot already have an ID", ENTITY_NAME, "idexists");
        }
        studyTermDTO = studyTermService.save(studyTermDTO);
        return ResponseEntity.created(new URI("/api/study-terms/" + studyTermDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, studyTermDTO.getId().toString()))
            .body(studyTermDTO);
    }

    /**
     * {@code PUT  /study-terms/:id} : Updates an existing studyTerm.
     *
     * @param id the id of the studyTermDTO to save.
     * @param studyTermDTO the studyTermDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studyTermDTO,
     * or with status {@code 400 (Bad Request)} if the studyTermDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studyTermDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudyTermDTO> updateStudyTerm(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody StudyTermDTO studyTermDTO
    ) throws URISyntaxException {
        log.debug("REST request to update StudyTerm : {}, {}", id, studyTermDTO);
        if (studyTermDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studyTermDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studyTermRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        studyTermDTO = studyTermService.update(studyTermDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studyTermDTO.getId().toString()))
            .body(studyTermDTO);
    }

    /**
     * {@code PATCH  /study-terms/:id} : Partial updates given fields of an existing studyTerm, field will ignore if it is null
     *
     * @param id the id of the studyTermDTO to save.
     * @param studyTermDTO the studyTermDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studyTermDTO,
     * or with status {@code 400 (Bad Request)} if the studyTermDTO is not valid,
     * or with status {@code 404 (Not Found)} if the studyTermDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the studyTermDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StudyTermDTO> partialUpdateStudyTerm(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody StudyTermDTO studyTermDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update StudyTerm partially : {}, {}", id, studyTermDTO);
        if (studyTermDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studyTermDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studyTermRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StudyTermDTO> result = studyTermService.partialUpdate(studyTermDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studyTermDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /study-terms} : get all the studyTerms.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studyTerms in body.
     */
    @GetMapping("")
    public List<StudyTermDTO> getAllStudyTerms() {
        log.debug("REST request to get all StudyTerms");
        return studyTermService.findAll();
    }

    /**
     * {@code GET  /study-terms/:id} : get the "id" studyTerm.
     *
     * @param id the id of the studyTermDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studyTermDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudyTermDTO> getStudyTerm(@PathVariable("id") Long id) {
        log.debug("REST request to get StudyTerm : {}", id);
        Optional<StudyTermDTO> studyTermDTO = studyTermService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studyTermDTO);
    }

    /**
     * {@code DELETE  /study-terms/:id} : delete the "id" studyTerm.
     *
     * @param id the id of the studyTermDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudyTerm(@PathVariable("id") Long id) {
        log.debug("REST request to delete StudyTerm : {}", id);
        studyTermService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
