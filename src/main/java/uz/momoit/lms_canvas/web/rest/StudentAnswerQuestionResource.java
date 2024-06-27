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
import uz.momoit.lms_canvas.repository.StudentAnswerQuestionRepository;
import uz.momoit.lms_canvas.service.StudentAnswerQuestionService;
import uz.momoit.lms_canvas.service.dto.StudentAnswerQuestionDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.StudentAnswerQuestion}.
 */
@RestController
@RequestMapping("/api/student-answer-questions")
public class StudentAnswerQuestionResource {

    private static final Logger log = LoggerFactory.getLogger(StudentAnswerQuestionResource.class);

    private static final String ENTITY_NAME = "studentAnswerQuestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentAnswerQuestionService studentAnswerQuestionService;

    private final StudentAnswerQuestionRepository studentAnswerQuestionRepository;

    public StudentAnswerQuestionResource(
        StudentAnswerQuestionService studentAnswerQuestionService,
        StudentAnswerQuestionRepository studentAnswerQuestionRepository
    ) {
        this.studentAnswerQuestionService = studentAnswerQuestionService;
        this.studentAnswerQuestionRepository = studentAnswerQuestionRepository;
    }

    /**
     * {@code POST  /student-answer-questions} : Create a new studentAnswerQuestion.
     *
     * @param studentAnswerQuestionDTO the studentAnswerQuestionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentAnswerQuestionDTO, or with status {@code 400 (Bad Request)} if the studentAnswerQuestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<StudentAnswerQuestionDTO> createStudentAnswerQuestion(
        @RequestBody StudentAnswerQuestionDTO studentAnswerQuestionDTO
    ) throws URISyntaxException {
        log.debug("REST request to save StudentAnswerQuestion : {}", studentAnswerQuestionDTO);
        if (studentAnswerQuestionDTO.getId() != null) {
            throw new BadRequestAlertException("A new studentAnswerQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        studentAnswerQuestionDTO = studentAnswerQuestionService.save(studentAnswerQuestionDTO);
        return ResponseEntity.created(new URI("/api/student-answer-questions/" + studentAnswerQuestionDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, studentAnswerQuestionDTO.getId().toString()))
            .body(studentAnswerQuestionDTO);
    }

    /**
     * {@code PUT  /student-answer-questions/:id} : Updates an existing studentAnswerQuestion.
     *
     * @param id the id of the studentAnswerQuestionDTO to save.
     * @param studentAnswerQuestionDTO the studentAnswerQuestionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentAnswerQuestionDTO,
     * or with status {@code 400 (Bad Request)} if the studentAnswerQuestionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentAnswerQuestionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudentAnswerQuestionDTO> updateStudentAnswerQuestion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudentAnswerQuestionDTO studentAnswerQuestionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update StudentAnswerQuestion : {}, {}", id, studentAnswerQuestionDTO);
        if (studentAnswerQuestionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studentAnswerQuestionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studentAnswerQuestionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        studentAnswerQuestionDTO = studentAnswerQuestionService.update(studentAnswerQuestionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentAnswerQuestionDTO.getId().toString()))
            .body(studentAnswerQuestionDTO);
    }

    /**
     * {@code PATCH  /student-answer-questions/:id} : Partial updates given fields of an existing studentAnswerQuestion, field will ignore if it is null
     *
     * @param id the id of the studentAnswerQuestionDTO to save.
     * @param studentAnswerQuestionDTO the studentAnswerQuestionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentAnswerQuestionDTO,
     * or with status {@code 400 (Bad Request)} if the studentAnswerQuestionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the studentAnswerQuestionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the studentAnswerQuestionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StudentAnswerQuestionDTO> partialUpdateStudentAnswerQuestion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudentAnswerQuestionDTO studentAnswerQuestionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update StudentAnswerQuestion partially : {}, {}", id, studentAnswerQuestionDTO);
        if (studentAnswerQuestionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studentAnswerQuestionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studentAnswerQuestionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StudentAnswerQuestionDTO> result = studentAnswerQuestionService.partialUpdate(studentAnswerQuestionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentAnswerQuestionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /student-answer-questions} : get all the studentAnswerQuestions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studentAnswerQuestions in body.
     */
    @GetMapping("")
    public ResponseEntity<List<StudentAnswerQuestionDTO>> getAllStudentAnswerQuestions(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of StudentAnswerQuestions");
        Page<StudentAnswerQuestionDTO> page = studentAnswerQuestionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /student-answer-questions/:id} : get the "id" studentAnswerQuestion.
     *
     * @param id the id of the studentAnswerQuestionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentAnswerQuestionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudentAnswerQuestionDTO> getStudentAnswerQuestion(@PathVariable("id") Long id) {
        log.debug("REST request to get StudentAnswerQuestion : {}", id);
        Optional<StudentAnswerQuestionDTO> studentAnswerQuestionDTO = studentAnswerQuestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentAnswerQuestionDTO);
    }

    /**
     * {@code DELETE  /student-answer-questions/:id} : delete the "id" studentAnswerQuestion.
     *
     * @param id the id of the studentAnswerQuestionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentAnswerQuestion(@PathVariable("id") Long id) {
        log.debug("REST request to delete StudentAnswerQuestion : {}", id);
        studentAnswerQuestionService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
