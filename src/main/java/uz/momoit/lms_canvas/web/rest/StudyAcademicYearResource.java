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
import uz.momoit.lms_canvas.repository.StudyAcademicYearRepository;
import uz.momoit.lms_canvas.service.StudyAcademicYearService;
import uz.momoit.lms_canvas.service.dto.StudyAcademicYearDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.StudyAcademicYear}.
 */
@RestController
@RequestMapping("/api/study-academic-years")
public class StudyAcademicYearResource {

    private static final Logger log = LoggerFactory.getLogger(StudyAcademicYearResource.class);

    private static final String ENTITY_NAME = "studyAcademicYear";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudyAcademicYearService studyAcademicYearService;

    private final StudyAcademicYearRepository studyAcademicYearRepository;

    public StudyAcademicYearResource(
        StudyAcademicYearService studyAcademicYearService,
        StudyAcademicYearRepository studyAcademicYearRepository
    ) {
        this.studyAcademicYearService = studyAcademicYearService;
        this.studyAcademicYearRepository = studyAcademicYearRepository;
    }

    /**
     * {@code POST  /study-academic-years} : Create a new studyAcademicYear.
     *
     * @param studyAcademicYearDTO the studyAcademicYearDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studyAcademicYearDTO, or with status {@code 400 (Bad Request)} if the studyAcademicYear has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<StudyAcademicYearDTO> createStudyAcademicYear(@RequestBody StudyAcademicYearDTO studyAcademicYearDTO)
        throws URISyntaxException {
        log.debug("REST request to save StudyAcademicYear : {}", studyAcademicYearDTO);
        if (studyAcademicYearDTO.getId() != null) {
            throw new BadRequestAlertException("A new studyAcademicYear cannot already have an ID", ENTITY_NAME, "idexists");
        }
        studyAcademicYearDTO = studyAcademicYearService.save(studyAcademicYearDTO);
        return ResponseEntity.created(new URI("/api/study-academic-years/" + studyAcademicYearDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, studyAcademicYearDTO.getId().toString()))
            .body(studyAcademicYearDTO);
    }

    /**
     * {@code PUT  /study-academic-years/:id} : Updates an existing studyAcademicYear.
     *
     * @param id the id of the studyAcademicYearDTO to save.
     * @param studyAcademicYearDTO the studyAcademicYearDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studyAcademicYearDTO,
     * or with status {@code 400 (Bad Request)} if the studyAcademicYearDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studyAcademicYearDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudyAcademicYearDTO> updateStudyAcademicYear(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudyAcademicYearDTO studyAcademicYearDTO
    ) throws URISyntaxException {
        log.debug("REST request to update StudyAcademicYear : {}, {}", id, studyAcademicYearDTO);
        if (studyAcademicYearDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studyAcademicYearDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studyAcademicYearRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        studyAcademicYearDTO = studyAcademicYearService.update(studyAcademicYearDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studyAcademicYearDTO.getId().toString()))
            .body(studyAcademicYearDTO);
    }

    /**
     * {@code PATCH  /study-academic-years/:id} : Partial updates given fields of an existing studyAcademicYear, field will ignore if it is null
     *
     * @param id the id of the studyAcademicYearDTO to save.
     * @param studyAcademicYearDTO the studyAcademicYearDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studyAcademicYearDTO,
     * or with status {@code 400 (Bad Request)} if the studyAcademicYearDTO is not valid,
     * or with status {@code 404 (Not Found)} if the studyAcademicYearDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the studyAcademicYearDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StudyAcademicYearDTO> partialUpdateStudyAcademicYear(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudyAcademicYearDTO studyAcademicYearDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update StudyAcademicYear partially : {}, {}", id, studyAcademicYearDTO);
        if (studyAcademicYearDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studyAcademicYearDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studyAcademicYearRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StudyAcademicYearDTO> result = studyAcademicYearService.partialUpdate(studyAcademicYearDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studyAcademicYearDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /study-academic-years} : get all the studyAcademicYears.
     *
     * @param pageable the pagination information.
     * @param filter the filter of the request.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studyAcademicYears in body.
     */
    @GetMapping("")
    public ResponseEntity<List<StudyAcademicYearDTO>> getAllStudyAcademicYears(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable,
        @RequestParam(name = "filter", required = false) String filter
    ) {
        if ("student-is-null".equals(filter)) {
            log.debug("REST request to get all StudyAcademicYears where student is null");
            return new ResponseEntity<>(studyAcademicYearService.findAllWhereStudentIsNull(), HttpStatus.OK);
        }
        log.debug("REST request to get a page of StudyAcademicYears");
        Page<StudyAcademicYearDTO> page = studyAcademicYearService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /study-academic-years/:id} : get the "id" studyAcademicYear.
     *
     * @param id the id of the studyAcademicYearDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studyAcademicYearDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudyAcademicYearDTO> getStudyAcademicYear(@PathVariable("id") Long id) {
        log.debug("REST request to get StudyAcademicYear : {}", id);
        Optional<StudyAcademicYearDTO> studyAcademicYearDTO = studyAcademicYearService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studyAcademicYearDTO);
    }

    /**
     * {@code DELETE  /study-academic-years/:id} : delete the "id" studyAcademicYear.
     *
     * @param id the id of the studyAcademicYearDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudyAcademicYear(@PathVariable("id") Long id) {
        log.debug("REST request to delete StudyAcademicYear : {}", id);
        studyAcademicYearService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
