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
import uz.momoit.lms_canvas.repository.StudentOptionRepository;
import uz.momoit.lms_canvas.service.StudentOptionService;
import uz.momoit.lms_canvas.service.dto.StudentOptionDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.StudentOption}.
 */
@RestController
@RequestMapping("/api/student-options")
public class StudentOptionResource {

    private static final Logger log = LoggerFactory.getLogger(StudentOptionResource.class);

    private static final String ENTITY_NAME = "studentOption";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final StudentOptionService studentOptionService;

    private final StudentOptionRepository studentOptionRepository;

    public StudentOptionResource(StudentOptionService studentOptionService, StudentOptionRepository studentOptionRepository) {
        this.studentOptionService = studentOptionService;
        this.studentOptionRepository = studentOptionRepository;
    }

    /**
     * {@code POST  /student-options} : Create a new studentOption.
     *
     * @param studentOptionDTO the studentOptionDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new studentOptionDTO, or with status {@code 400 (Bad Request)} if the studentOption has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<StudentOptionDTO> createStudentOption(@RequestBody StudentOptionDTO studentOptionDTO) throws URISyntaxException {
        log.debug("REST request to save StudentOption : {}", studentOptionDTO);
        if (studentOptionDTO.getId() != null) {
            throw new BadRequestAlertException("A new studentOption cannot already have an ID", ENTITY_NAME, "idexists");
        }
        studentOptionDTO = studentOptionService.save(studentOptionDTO);
        return ResponseEntity.created(new URI("/api/student-options/" + studentOptionDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, studentOptionDTO.getId().toString()))
            .body(studentOptionDTO);
    }

    /**
     * {@code PUT  /student-options/:id} : Updates an existing studentOption.
     *
     * @param id the id of the studentOptionDTO to save.
     * @param studentOptionDTO the studentOptionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentOptionDTO,
     * or with status {@code 400 (Bad Request)} if the studentOptionDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the studentOptionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<StudentOptionDTO> updateStudentOption(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudentOptionDTO studentOptionDTO
    ) throws URISyntaxException {
        log.debug("REST request to update StudentOption : {}, {}", id, studentOptionDTO);
        if (studentOptionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studentOptionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studentOptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        studentOptionDTO = studentOptionService.update(studentOptionDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentOptionDTO.getId().toString()))
            .body(studentOptionDTO);
    }

    /**
     * {@code PATCH  /student-options/:id} : Partial updates given fields of an existing studentOption, field will ignore if it is null
     *
     * @param id the id of the studentOptionDTO to save.
     * @param studentOptionDTO the studentOptionDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated studentOptionDTO,
     * or with status {@code 400 (Bad Request)} if the studentOptionDTO is not valid,
     * or with status {@code 404 (Not Found)} if the studentOptionDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the studentOptionDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<StudentOptionDTO> partialUpdateStudentOption(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody StudentOptionDTO studentOptionDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update StudentOption partially : {}, {}", id, studentOptionDTO);
        if (studentOptionDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, studentOptionDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!studentOptionRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<StudentOptionDTO> result = studentOptionService.partialUpdate(studentOptionDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, studentOptionDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /student-options} : get all the studentOptions.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of studentOptions in body.
     */
    @GetMapping("")
    public ResponseEntity<List<StudentOptionDTO>> getAllStudentOptions(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of StudentOptions");
        Page<StudentOptionDTO> page = studentOptionService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /student-options/:id} : get the "id" studentOption.
     *
     * @param id the id of the studentOptionDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the studentOptionDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<StudentOptionDTO> getStudentOption(@PathVariable("id") Long id) {
        log.debug("REST request to get StudentOption : {}", id);
        Optional<StudentOptionDTO> studentOptionDTO = studentOptionService.findOne(id);
        return ResponseUtil.wrapOrNotFound(studentOptionDTO);
    }

    /**
     * {@code DELETE  /student-options/:id} : delete the "id" studentOption.
     *
     * @param id the id of the studentOptionDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStudentOption(@PathVariable("id") Long id) {
        log.debug("REST request to delete StudentOption : {}", id);
        studentOptionService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
