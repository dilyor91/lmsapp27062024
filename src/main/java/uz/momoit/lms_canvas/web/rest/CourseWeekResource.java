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
import uz.momoit.lms_canvas.repository.CourseWeekRepository;
import uz.momoit.lms_canvas.service.CourseWeekService;
import uz.momoit.lms_canvas.service.dto.CourseWeekDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.CourseWeek}.
 */
@RestController
@RequestMapping("/api/course-weeks")
public class CourseWeekResource {

    private static final Logger LOG = LoggerFactory.getLogger(CourseWeekResource.class);

    private static final String ENTITY_NAME = "courseWeek";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CourseWeekService courseWeekService;

    private final CourseWeekRepository courseWeekRepository;

    public CourseWeekResource(CourseWeekService courseWeekService, CourseWeekRepository courseWeekRepository) {
        this.courseWeekService = courseWeekService;
        this.courseWeekRepository = courseWeekRepository;
    }

    /**
     * {@code POST  /course-weeks} : Create a new courseWeek.
     *
     * @param courseWeekDTO the courseWeekDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new courseWeekDTO, or with status {@code 400 (Bad Request)} if the courseWeek has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CourseWeekDTO> createCourseWeek(@RequestBody CourseWeekDTO courseWeekDTO) throws URISyntaxException {
        LOG.debug("REST request to save CourseWeek : {}", courseWeekDTO);
        if (courseWeekDTO.getId() != null) {
            throw new BadRequestAlertException("A new courseWeek cannot already have an ID", ENTITY_NAME, "idexists");
        }
        courseWeekDTO = courseWeekService.save(courseWeekDTO);
        return ResponseEntity.created(new URI("/api/course-weeks/" + courseWeekDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, courseWeekDTO.getId().toString()))
            .body(courseWeekDTO);
    }

    /**
     * {@code PUT  /course-weeks/:id} : Updates an existing courseWeek.
     *
     * @param id the id of the courseWeekDTO to save.
     * @param courseWeekDTO the courseWeekDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courseWeekDTO,
     * or with status {@code 400 (Bad Request)} if the courseWeekDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the courseWeekDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CourseWeekDTO> updateCourseWeek(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CourseWeekDTO courseWeekDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CourseWeek : {}, {}", id, courseWeekDTO);
        if (courseWeekDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courseWeekDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courseWeekRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        courseWeekDTO = courseWeekService.update(courseWeekDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courseWeekDTO.getId().toString()))
            .body(courseWeekDTO);
    }

    /**
     * {@code PATCH  /course-weeks/:id} : Partial updates given fields of an existing courseWeek, field will ignore if it is null
     *
     * @param id the id of the courseWeekDTO to save.
     * @param courseWeekDTO the courseWeekDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courseWeekDTO,
     * or with status {@code 400 (Bad Request)} if the courseWeekDTO is not valid,
     * or with status {@code 404 (Not Found)} if the courseWeekDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the courseWeekDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CourseWeekDTO> partialUpdateCourseWeek(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CourseWeekDTO courseWeekDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CourseWeek partially : {}, {}", id, courseWeekDTO);
        if (courseWeekDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courseWeekDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courseWeekRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CourseWeekDTO> result = courseWeekService.partialUpdate(courseWeekDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courseWeekDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /course-weeks} : get all the courseWeeks.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of courseWeeks in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CourseWeekDTO>> getAllCourseWeeks(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of CourseWeeks");
        Page<CourseWeekDTO> page = courseWeekService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /course-weeks/:id} : get the "id" courseWeek.
     *
     * @param id the id of the courseWeekDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the courseWeekDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CourseWeekDTO> getCourseWeek(@PathVariable("id") Long id) {
        LOG.debug("REST request to get CourseWeek : {}", id);
        Optional<CourseWeekDTO> courseWeekDTO = courseWeekService.findOne(id);
        return ResponseUtil.wrapOrNotFound(courseWeekDTO);
    }

    /**
     * {@code DELETE  /course-weeks/:id} : delete the "id" courseWeek.
     *
     * @param id the id of the courseWeekDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourseWeek(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete CourseWeek : {}", id);
        courseWeekService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
