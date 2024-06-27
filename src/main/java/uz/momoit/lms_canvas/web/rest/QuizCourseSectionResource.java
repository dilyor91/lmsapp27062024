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
import uz.momoit.lms_canvas.repository.QuizCourseSectionRepository;
import uz.momoit.lms_canvas.service.QuizCourseSectionService;
import uz.momoit.lms_canvas.service.dto.QuizCourseSectionDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.QuizCourseSection}.
 */
@RestController
@RequestMapping("/api/quiz-course-sections")
public class QuizCourseSectionResource {

    private static final Logger log = LoggerFactory.getLogger(QuizCourseSectionResource.class);

    private static final String ENTITY_NAME = "quizCourseSection";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final QuizCourseSectionService quizCourseSectionService;

    private final QuizCourseSectionRepository quizCourseSectionRepository;

    public QuizCourseSectionResource(
        QuizCourseSectionService quizCourseSectionService,
        QuizCourseSectionRepository quizCourseSectionRepository
    ) {
        this.quizCourseSectionService = quizCourseSectionService;
        this.quizCourseSectionRepository = quizCourseSectionRepository;
    }

    /**
     * {@code POST  /quiz-course-sections} : Create a new quizCourseSection.
     *
     * @param quizCourseSectionDTO the quizCourseSectionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new quizCourseSectionDTO, or with status {@code 400 (Bad Request)} if the quizCourseSection has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<QuizCourseSectionDTO> createQuizCourseSection(@Valid @RequestBody QuizCourseSectionDTO quizCourseSectionDTO)
        throws URISyntaxException {
        log.debug("REST request to save QuizCourseSection : {}", quizCourseSectionDTO);
        if (quizCourseSectionDTO.getId() != null) {
            throw new BadRequestAlertException("A new quizCourseSection cannot already have an ID", ENTITY_NAME, "idexists");
        }
        quizCourseSectionDTO = quizCourseSectionService.save(quizCourseSectionDTO);
        return ResponseEntity.created(new URI("/api/quiz-course-sections/" + quizCourseSectionDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, quizCourseSectionDTO.getId().toString()))
            .body(quizCourseSectionDTO);
    }

    /**
     * {@code PUT  /quiz-course-sections/:id} : Updates an existing quizCourseSection.
     *
     * @param id the id of the quizCourseSectionDTO to save.
     * @param quizCourseSectionDTO the quizCourseSectionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizCourseSectionDTO,
     * or with status {@code 400 (Bad Request)} if the quizCourseSectionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the quizCourseSectionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<QuizCourseSectionDTO> updateQuizCourseSection(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody QuizCourseSectionDTO quizCourseSectionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update QuizCourseSection : {}, {}", id, quizCourseSectionDTO);
        if (quizCourseSectionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quizCourseSectionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quizCourseSectionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        quizCourseSectionDTO = quizCourseSectionService.update(quizCourseSectionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizCourseSectionDTO.getId().toString()))
            .body(quizCourseSectionDTO);
    }

    /**
     * {@code PATCH  /quiz-course-sections/:id} : Partial updates given fields of an existing quizCourseSection, field will ignore if it is null
     *
     * @param id the id of the quizCourseSectionDTO to save.
     * @param quizCourseSectionDTO the quizCourseSectionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated quizCourseSectionDTO,
     * or with status {@code 400 (Bad Request)} if the quizCourseSectionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the quizCourseSectionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the quizCourseSectionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<QuizCourseSectionDTO> partialUpdateQuizCourseSection(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody QuizCourseSectionDTO quizCourseSectionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update QuizCourseSection partially : {}, {}", id, quizCourseSectionDTO);
        if (quizCourseSectionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, quizCourseSectionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!quizCourseSectionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<QuizCourseSectionDTO> result = quizCourseSectionService.partialUpdate(quizCourseSectionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, quizCourseSectionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /quiz-course-sections} : get all the quizCourseSections.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of quizCourseSections in body.
     */
    @GetMapping("")
    public ResponseEntity<List<QuizCourseSectionDTO>> getAllQuizCourseSections(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of QuizCourseSections");
        Page<QuizCourseSectionDTO> page = quizCourseSectionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /quiz-course-sections/:id} : get the "id" quizCourseSection.
     *
     * @param id the id of the quizCourseSectionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the quizCourseSectionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<QuizCourseSectionDTO> getQuizCourseSection(@PathVariable("id") Long id) {
        log.debug("REST request to get QuizCourseSection : {}", id);
        Optional<QuizCourseSectionDTO> quizCourseSectionDTO = quizCourseSectionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(quizCourseSectionDTO);
    }

    /**
     * {@code DELETE  /quiz-course-sections/:id} : delete the "id" quizCourseSection.
     *
     * @param id the id of the quizCourseSectionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuizCourseSection(@PathVariable("id") Long id) {
        log.debug("REST request to delete QuizCourseSection : {}", id);
        quizCourseSectionService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
