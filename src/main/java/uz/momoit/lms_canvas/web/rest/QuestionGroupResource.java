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
import uz.momoit.lms_canvas.repository.QuestionGroupRepository;
import uz.momoit.lms_canvas.service.QuestionGroupService;
import uz.momoit.lms_canvas.service.dto.QuestionGroupDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.QuestionGroup}.
 */
@RestController
@RequestMapping("/api/question-groups")
public class QuestionGroupResource {

    private static final Logger LOG = LoggerFactory.getLogger(QuestionGroupResource.class);

    private static final String ENTITY_NAME = "questionGroup";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuestionGroupService questionGroupService;

    private final QuestionGroupRepository questionGroupRepository;

    public QuestionGroupResource(QuestionGroupService questionGroupService, QuestionGroupRepository questionGroupRepository) {
        this.questionGroupService = questionGroupService;
        this.questionGroupRepository = questionGroupRepository;
    }

    /**
     * {@code POST  /question-groups} : Create a new questionGroup.
     *
     * @param questionGroupDTO the questionGroupDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new questionGroupDTO, or with status {@code 400 (Bad Request)} if the questionGroup has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<QuestionGroupDTO> createQuestionGroup(@Valid @RequestBody QuestionGroupDTO questionGroupDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save QuestionGroup : {}", questionGroupDTO);
        if (questionGroupDTO.getId() != null) {
            throw new BadRequestAlertException("A new questionGroup cannot already have an ID", ENTITY_NAME, "idexists");
        }
        questionGroupDTO = questionGroupService.save(questionGroupDTO);
        return ResponseEntity.created(new URI("/api/question-groups/" + questionGroupDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, questionGroupDTO.getId().toString()))
            .body(questionGroupDTO);
    }

    /**
     * {@code PUT  /question-groups/:id} : Updates an existing questionGroup.
     *
     * @param id the id of the questionGroupDTO to save.
     * @param questionGroupDTO the questionGroupDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionGroupDTO,
     * or with status {@code 400 (Bad Request)} if the questionGroupDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the questionGroupDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<QuestionGroupDTO> updateQuestionGroup(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody QuestionGroupDTO questionGroupDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update QuestionGroup : {}, {}", id, questionGroupDTO);
        if (questionGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, questionGroupDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!questionGroupRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        questionGroupDTO = questionGroupService.update(questionGroupDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, questionGroupDTO.getId().toString()))
            .body(questionGroupDTO);
    }

    /**
     * {@code PATCH  /question-groups/:id} : Partial updates given fields of an existing questionGroup, field will ignore if it is null
     *
     * @param id the id of the questionGroupDTO to save.
     * @param questionGroupDTO the questionGroupDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated questionGroupDTO,
     * or with status {@code 400 (Bad Request)} if the questionGroupDTO is not valid,
     * or with status {@code 404 (Not Found)} if the questionGroupDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the questionGroupDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<QuestionGroupDTO> partialUpdateQuestionGroup(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody QuestionGroupDTO questionGroupDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update QuestionGroup partially : {}, {}", id, questionGroupDTO);
        if (questionGroupDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, questionGroupDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!questionGroupRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<QuestionGroupDTO> result = questionGroupService.partialUpdate(questionGroupDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, questionGroupDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /question-groups} : get all the questionGroups.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of questionGroups in body.
     */
    @GetMapping("")
    public ResponseEntity<List<QuestionGroupDTO>> getAllQuestionGroups(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of QuestionGroups");
        Page<QuestionGroupDTO> page = questionGroupService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /question-groups/:id} : get the "id" questionGroup.
     *
     * @param id the id of the questionGroupDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the questionGroupDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<QuestionGroupDTO> getQuestionGroup(@PathVariable("id") Long id) {
        LOG.debug("REST request to get QuestionGroup : {}", id);
        Optional<QuestionGroupDTO> questionGroupDTO = questionGroupService.findOne(id);
        return ResponseUtil.wrapOrNotFound(questionGroupDTO);
    }

    /**
     * {@code DELETE  /question-groups/:id} : delete the "id" questionGroup.
     *
     * @param id the id of the questionGroupDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuestionGroup(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete QuestionGroup : {}", id);
        questionGroupService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
