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
import uz.momoit.lms_canvas.repository.QuizResultRepository;
import uz.momoit.lms_canvas.service.QuizResultService;
import uz.momoit.lms_canvas.service.dto.QuizResultDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.QuizResult}.
 */
@RestController
@RequestMapping("/api/quiz-results")
public class QuizResultResource {

    private static final Logger log = LoggerFactory.getLogger(QuizResultResource.class);

    private static final String ENTITY_NAME = "quizResult";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuizResultService quizResultService;

    private final QuizResultRepository quizResultRepository;

    public QuizResultResource(QuizResultService quizResultService, QuizResultRepository quizResultRepository) {
        this.quizResultService = quizResultService;
        this.quizResultRepository = quizResultRepository;
    }

    /**
     * {@code POST  /quiz-results} : Create a new quizResult.
     *
     * @param quizResultDTO the quizResultDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quizResultDTO, or with status {@code 400 (Bad Request)} if the quizResult has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<QuizResultDTO> createQuizResult(@RequestBody QuizResultDTO quizResultDTO) throws URISyntaxException {
        log.debug("REST request to save QuizResult : {}", quizResultDTO);
        if (quizResultDTO.getId() != null) {
            throw new BadRequestAlertException("A new quizResult cannot already have an ID", ENTITY_NAME, "idexists");
        }
        quizResultDTO = quizResultService.save(quizResultDTO);
        return ResponseEntity.created(new URI("/api/quiz-results/" + quizResultDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, quizResultDTO.getId().toString()))
            .body(quizResultDTO);
    }

    /**
     * {@code PUT  /quiz-results/:id} : Updates an existing quizResult.
     *
     * @param id the id of the quizResultDTO to save.
     * @param quizResultDTO the quizResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizResultDTO,
     * or with status {@code 400 (Bad Request)} if the quizResultDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quizResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<QuizResultDTO> updateQuizResult(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody QuizResultDTO quizResultDTO
    ) throws URISyntaxException {
        log.debug("REST request to update QuizResult : {}, {}", id, quizResultDTO);
        if (quizResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quizResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quizResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        quizResultDTO = quizResultService.update(quizResultDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizResultDTO.getId().toString()))
            .body(quizResultDTO);
    }

    /**
     * {@code PATCH  /quiz-results/:id} : Partial updates given fields of an existing quizResult, field will ignore if it is null
     *
     * @param id the id of the quizResultDTO to save.
     * @param quizResultDTO the quizResultDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizResultDTO,
     * or with status {@code 400 (Bad Request)} if the quizResultDTO is not valid,
     * or with status {@code 404 (Not Found)} if the quizResultDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the quizResultDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<QuizResultDTO> partialUpdateQuizResult(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody QuizResultDTO quizResultDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update QuizResult partially : {}, {}", id, quizResultDTO);
        if (quizResultDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quizResultDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quizResultRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<QuizResultDTO> result = quizResultService.partialUpdate(quizResultDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizResultDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /quiz-results} : get all the quizResults.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quizResults in body.
     */
    @GetMapping("")
    public ResponseEntity<List<QuizResultDTO>> getAllQuizResults(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of QuizResults");
        Page<QuizResultDTO> page = quizResultService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /quiz-results/:id} : get the "id" quizResult.
     *
     * @param id the id of the quizResultDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quizResultDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<QuizResultDTO> getQuizResult(@PathVariable("id") Long id) {
        log.debug("REST request to get QuizResult : {}", id);
        Optional<QuizResultDTO> quizResultDTO = quizResultService.findOne(id);
        return ResponseUtil.wrapOrNotFound(quizResultDTO);
    }

    /**
     * {@code DELETE  /quiz-results/:id} : delete the "id" quizResult.
     *
     * @param id the id of the quizResultDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizResult(@PathVariable("id") Long id) {
        log.debug("REST request to delete QuizResult : {}", id);
        quizResultService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
