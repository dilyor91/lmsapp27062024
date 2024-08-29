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
import uz.momoit.lms_canvas.repository.QuizSessionRepository;
import uz.momoit.lms_canvas.service.QuizSessionService;
import uz.momoit.lms_canvas.service.dto.QuizSessionDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.QuizSession}.
 */
@RestController
@RequestMapping("/api/quiz-sessions")
public class QuizSessionResource {

    private static final Logger LOG = LoggerFactory.getLogger(QuizSessionResource.class);

    private static final String ENTITY_NAME = "quizSession";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuizSessionService quizSessionService;

    private final QuizSessionRepository quizSessionRepository;

    public QuizSessionResource(QuizSessionService quizSessionService, QuizSessionRepository quizSessionRepository) {
        this.quizSessionService = quizSessionService;
        this.quizSessionRepository = quizSessionRepository;
    }

    /**
     * {@code POST  /quiz-sessions} : Create a new quizSession.
     *
     * @param quizSessionDTO the quizSessionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quizSessionDTO, or with status {@code 400 (Bad Request)} if the quizSession has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<QuizSessionDTO> createQuizSession(@RequestBody QuizSessionDTO quizSessionDTO) throws URISyntaxException {
        LOG.debug("REST request to save QuizSession : {}", quizSessionDTO);
        if (quizSessionDTO.getId() != null) {
            throw new BadRequestAlertException("A new quizSession cannot already have an ID", ENTITY_NAME, "idexists");
        }
        quizSessionDTO = quizSessionService.save(quizSessionDTO);
        return ResponseEntity.created(new URI("/api/quiz-sessions/" + quizSessionDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, quizSessionDTO.getId().toString()))
            .body(quizSessionDTO);
    }

    /**
     * {@code PUT  /quiz-sessions/:id} : Updates an existing quizSession.
     *
     * @param id the id of the quizSessionDTO to save.
     * @param quizSessionDTO the quizSessionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizSessionDTO,
     * or with status {@code 400 (Bad Request)} if the quizSessionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quizSessionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<QuizSessionDTO> updateQuizSession(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody QuizSessionDTO quizSessionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update QuizSession : {}, {}", id, quizSessionDTO);
        if (quizSessionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quizSessionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quizSessionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        quizSessionDTO = quizSessionService.update(quizSessionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizSessionDTO.getId().toString()))
            .body(quizSessionDTO);
    }

    /**
     * {@code PATCH  /quiz-sessions/:id} : Partial updates given fields of an existing quizSession, field will ignore if it is null
     *
     * @param id the id of the quizSessionDTO to save.
     * @param quizSessionDTO the quizSessionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizSessionDTO,
     * or with status {@code 400 (Bad Request)} if the quizSessionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the quizSessionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the quizSessionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<QuizSessionDTO> partialUpdateQuizSession(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody QuizSessionDTO quizSessionDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update QuizSession partially : {}, {}", id, quizSessionDTO);
        if (quizSessionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quizSessionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quizSessionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<QuizSessionDTO> result = quizSessionService.partialUpdate(quizSessionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizSessionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /quiz-sessions} : get all the quizSessions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quizSessions in body.
     */
    @GetMapping("")
    public ResponseEntity<List<QuizSessionDTO>> getAllQuizSessions(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of QuizSessions");
        Page<QuizSessionDTO> page = quizSessionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /quiz-sessions/:id} : get the "id" quizSession.
     *
     * @param id the id of the quizSessionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quizSessionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<QuizSessionDTO> getQuizSession(@PathVariable("id") Long id) {
        LOG.debug("REST request to get QuizSession : {}", id);
        Optional<QuizSessionDTO> quizSessionDTO = quizSessionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(quizSessionDTO);
    }

    /**
     * {@code DELETE  /quiz-sessions/:id} : delete the "id" quizSession.
     *
     * @param id the id of the quizSessionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizSession(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete QuizSession : {}", id);
        quizSessionService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
