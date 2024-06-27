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
import uz.momoit.lms_canvas.repository.StudentQuestionRepository;
import uz.momoit.lms_canvas.service.StudentQuestionService;
import uz.momoit.lms_canvas.service.dto.StudentQuestionDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.StudentQuestion}.
 */
@RestController
@RequestMapping("/api/student-questions")
public class StudentQuestionResource {

    private static final Logger log = LoggerFactory.getLogger(StudentQuestionResource.class);

    private static final String ENTITY_NAME = "studentQuestion";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentQuestionService studentQuestionService;

    private final StudentQuestionRepository studentQuestionRepository;

    public StudentQuestionResource(StudentQuestionService studentQuestionService, StudentQuestionRepository studentQuestionRepository) {
        this.studentQuestionService = studentQuestionService;
        this.studentQuestionRepository = studentQuestionRepository;
    }

    /**
     * {@code POST  /student-questions} : Create a new studentQuestion.
     *
     * @param studentQuestionDTO the studentQuestionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentQuestionDTO, or with status {@code 400 (Bad Request)} if the studentQuestion has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<StudentQuestionDTO> createStudentQuestion(@RequestBody StudentQuestionDTO studentQuestionDTO)
        throws URISyntaxException {
        log.debug("REST request to save StudentQuestion : {}", studentQuestionDTO);
        if (studentQuestionDTO.getId() != null) {
            throw new BadRequestAlertException("A new studentQuestion cannot already have an ID", ENTITY_NAME, "idexists");
        }
        studentQuestionDTO = studentQuestionService.save(studentQuestionDTO);
        return ResponseEntity.created(new URI("/api/student-questions/" + studentQuestionDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, studentQuestionDTO.getId().toString()))
            .body(studentQuestionDTO);
    }

    /**
     * {@code PUT  /student-questions/:id} : Updates an existing studentQuestion.
     *
     * @param id the id of the studentQuestionDTO to save.
     * @param studentQuestionDTO the studentQuestionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentQuestionDTO,
     * or with status {@code 400 (Bad Request)} if the studentQuestionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentQuestionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudentQuestionDTO> updateStudentQuestion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudentQuestionDTO studentQuestionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update StudentQuestion : {}, {}", id, studentQuestionDTO);
        if (studentQuestionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studentQuestionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studentQuestionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        studentQuestionDTO = studentQuestionService.update(studentQuestionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentQuestionDTO.getId().toString()))
            .body(studentQuestionDTO);
    }

    /**
     * {@code PATCH  /student-questions/:id} : Partial updates given fields of an existing studentQuestion, field will ignore if it is null
     *
     * @param id the id of the studentQuestionDTO to save.
     * @param studentQuestionDTO the studentQuestionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentQuestionDTO,
     * or with status {@code 400 (Bad Request)} if the studentQuestionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the studentQuestionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the studentQuestionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StudentQuestionDTO> partialUpdateStudentQuestion(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudentQuestionDTO studentQuestionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update StudentQuestion partially : {}, {}", id, studentQuestionDTO);
        if (studentQuestionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studentQuestionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studentQuestionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StudentQuestionDTO> result = studentQuestionService.partialUpdate(studentQuestionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentQuestionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /student-questions} : get all the studentQuestions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studentQuestions in body.
     */
    @GetMapping("")
    public ResponseEntity<List<StudentQuestionDTO>> getAllStudentQuestions(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of StudentQuestions");
        Page<StudentQuestionDTO> page = studentQuestionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /student-questions/:id} : get the "id" studentQuestion.
     *
     * @param id the id of the studentQuestionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentQuestionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudentQuestionDTO> getStudentQuestion(@PathVariable("id") Long id) {
        log.debug("REST request to get StudentQuestion : {}", id);
        Optional<StudentQuestionDTO> studentQuestionDTO = studentQuestionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentQuestionDTO);
    }

    /**
     * {@code DELETE  /student-questions/:id} : delete the "id" studentQuestion.
     *
     * @param id the id of the studentQuestionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentQuestion(@PathVariable("id") Long id) {
        log.debug("REST request to delete StudentQuestion : {}", id);
        studentQuestionService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
