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
import uz.momoit.lms_canvas.repository.ExamResultRepository;
import uz.momoit.lms_canvas.service.ExamResultService;
import uz.momoit.lms_canvas.service.dto.ExamResultDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.ExamResult}.
 */
@RestController
@RequestMapping("/api/exam-results")
public class ExamResultResource {

    private static final Logger LOG = LoggerFactory.getLogger(ExamResultResource.class);

    private static final String ENTITY_NAME = "examResult";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ExamResultService examResultService;

    private final ExamResultRepository examResultRepository;

    public ExamResultResource(ExamResultService examResultService, ExamResultRepository examResultRepository) {
        this.examResultService = examResultService;
        this.examResultRepository = examResultRepository;
    }

    /**
     * {@code POST  /exam-results} : Create a new examResult.
     *
     * @param examResultDTO the examResultDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new examResultDTO, or with status {@code 400 (Bad Request)} if the examResult has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<ExamResultDTO> createExamResult(@RequestBody ExamResultDTO examResultDTO) throws URISyntaxException {
        LOG.debug("REST request to save ExamResult : {}", examResultDTO);
        if (examResultDTO.getId() != null) {
            throw new BadRequestAlertException("A new examResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        examResultDTO = examResultService.save(examResultDTO);
        return ResponseEntity.created(new URI("/api/exam-results/" + examResultDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, examResultDTO.getId().toString()))
            .body(examResultDTO);
    }

    /**
     * {@code PUT  /exam-results/:id} : Updates an existing examResult.
     *
     * @param id the id of the examResultDTO to save.
     * @param examResultDTO the examResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated examResultDTO,
     * or with status {@code 400 (Bad Request)} if the examResultDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the examResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<ExamResultDTO> updateExamResult(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ExamResultDTO examResultDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update ExamResult : {}, {}", id, examResultDTO);
        if (examResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, examResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!examResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        examResultDTO = examResultService.update(examResultDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, examResultDTO.getId().toString()))
            .body(examResultDTO);
    }

    /**
     * {@code PATCH  /exam-results/:id} : Partial updates given fields of an existing examResult, field will ignore if it is null
     *
     * @param id the id of the examResultDTO to save.
     * @param examResultDTO the examResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated examResultDTO,
     * or with status {@code 400 (Bad Request)} if the examResultDTO is not valid,
     * or with status {@code 404 (Not Found)} if the examResultDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the examResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<ExamResultDTO> partialUpdateExamResult(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody ExamResultDTO examResultDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update ExamResult partially : {}, {}", id, examResultDTO);
        if (examResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, examResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!examResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<ExamResultDTO> result = examResultService.partialUpdate(examResultDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, examResultDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /exam-results} : get all the examResults.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of examResults in body.
     */
    @GetMapping("")
    public ResponseEntity<List<ExamResultDTO>> getAllExamResults(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of ExamResults");
        Page<ExamResultDTO> page = examResultService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /exam-results/:id} : get the "id" examResult.
     *
     * @param id the id of the examResultDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the examResultDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<ExamResultDTO> getExamResult(@PathVariable("id") Long id) {
        LOG.debug("REST request to get ExamResult : {}", id);
        Optional<ExamResultDTO> examResultDTO = examResultService.findOne(id);
        return ResponseUtil.wrapOrNotFound(examResultDTO);
    }

    /**
     * {@code DELETE  /exam-results/:id} : delete the "id" examResult.
     *
     * @param id the id of the examResultDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExamResult(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete ExamResult : {}", id);
        examResultService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
