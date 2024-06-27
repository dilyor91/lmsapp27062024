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
import uz.momoit.lms_canvas.repository.QuizQuestionGroupRepository;
import uz.momoit.lms_canvas.service.QuizQuestionGroupService;
import uz.momoit.lms_canvas.service.dto.QuizQuestionGroupDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.QuizQuestionGroup}.
 */
@RestController
@RequestMapping("/api/quiz-question-groups")
public class QuizQuestionGroupResource {

    private static final Logger log = LoggerFactory.getLogger(QuizQuestionGroupResource.class);

    private static final String ENTITY_NAME = "quizQuestionGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuizQuestionGroupService quizQuestionGroupService;

    private final QuizQuestionGroupRepository quizQuestionGroupRepository;

    public QuizQuestionGroupResource(
        QuizQuestionGroupService quizQuestionGroupService,
        QuizQuestionGroupRepository quizQuestionGroupRepository
    ) {
        this.quizQuestionGroupService = quizQuestionGroupService;
        this.quizQuestionGroupRepository = quizQuestionGroupRepository;
    }

    /**
     * {@code POST  /quiz-question-groups} : Create a new quizQuestionGroup.
     *
     * @param quizQuestionGroupDTO the quizQuestionGroupDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quizQuestionGroupDTO, or with status {@code 400 (Bad Request)} if the quizQuestionGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<QuizQuestionGroupDTO> createQuizQuestionGroup(@RequestBody QuizQuestionGroupDTO quizQuestionGroupDTO)
        throws URISyntaxException {
        log.debug("REST request to save QuizQuestionGroup : {}", quizQuestionGroupDTO);
        if (quizQuestionGroupDTO.getId() != null) {
            throw new BadRequestAlertException("A new quizQuestionGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        quizQuestionGroupDTO = quizQuestionGroupService.save(quizQuestionGroupDTO);
        return ResponseEntity.created(new URI("/api/quiz-question-groups/" + quizQuestionGroupDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, quizQuestionGroupDTO.getId().toString()))
            .body(quizQuestionGroupDTO);
    }

    /**
     * {@code PUT  /quiz-question-groups/:id} : Updates an existing quizQuestionGroup.
     *
     * @param id the id of the quizQuestionGroupDTO to save.
     * @param quizQuestionGroupDTO the quizQuestionGroupDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizQuestionGroupDTO,
     * or with status {@code 400 (Bad Request)} if the quizQuestionGroupDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quizQuestionGroupDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<QuizQuestionGroupDTO> updateQuizQuestionGroup(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody QuizQuestionGroupDTO quizQuestionGroupDTO
    ) throws URISyntaxException {
        log.debug("REST request to update QuizQuestionGroup : {}, {}", id, quizQuestionGroupDTO);
        if (quizQuestionGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quizQuestionGroupDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quizQuestionGroupRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        quizQuestionGroupDTO = quizQuestionGroupService.update(quizQuestionGroupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizQuestionGroupDTO.getId().toString()))
            .body(quizQuestionGroupDTO);
    }

    /**
     * {@code PATCH  /quiz-question-groups/:id} : Partial updates given fields of an existing quizQuestionGroup, field will ignore if it is null
     *
     * @param id the id of the quizQuestionGroupDTO to save.
     * @param quizQuestionGroupDTO the quizQuestionGroupDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizQuestionGroupDTO,
     * or with status {@code 400 (Bad Request)} if the quizQuestionGroupDTO is not valid,
     * or with status {@code 404 (Not Found)} if the quizQuestionGroupDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the quizQuestionGroupDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<QuizQuestionGroupDTO> partialUpdateQuizQuestionGroup(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody QuizQuestionGroupDTO quizQuestionGroupDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update QuizQuestionGroup partially : {}, {}", id, quizQuestionGroupDTO);
        if (quizQuestionGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quizQuestionGroupDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quizQuestionGroupRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<QuizQuestionGroupDTO> result = quizQuestionGroupService.partialUpdate(quizQuestionGroupDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizQuestionGroupDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /quiz-question-groups} : get all the quizQuestionGroups.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quizQuestionGroups in body.
     */
    @GetMapping("")
    public ResponseEntity<List<QuizQuestionGroupDTO>> getAllQuizQuestionGroups(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of QuizQuestionGroups");
        Page<QuizQuestionGroupDTO> page = quizQuestionGroupService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /quiz-question-groups/:id} : get the "id" quizQuestionGroup.
     *
     * @param id the id of the quizQuestionGroupDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quizQuestionGroupDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<QuizQuestionGroupDTO> getQuizQuestionGroup(@PathVariable("id") Long id) {
        log.debug("REST request to get QuizQuestionGroup : {}", id);
        Optional<QuizQuestionGroupDTO> quizQuestionGroupDTO = quizQuestionGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(quizQuestionGroupDTO);
    }

    /**
     * {@code DELETE  /quiz-question-groups/:id} : delete the "id" quizQuestionGroup.
     *
     * @param id the id of the quizQuestionGroupDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizQuestionGroup(@PathVariable("id") Long id) {
        log.debug("REST request to delete QuizQuestionGroup : {}", id);
        quizQuestionGroupService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
