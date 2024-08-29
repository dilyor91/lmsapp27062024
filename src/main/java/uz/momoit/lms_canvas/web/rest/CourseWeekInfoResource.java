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
import uz.momoit.lms_canvas.repository.CourseWeekInfoRepository;
import uz.momoit.lms_canvas.service.CourseWeekInfoService;
import uz.momoit.lms_canvas.service.dto.CourseWeekInfoDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.CourseWeekInfo}.
 */
@RestController
@RequestMapping("/api/course-week-infos")
public class CourseWeekInfoResource {

    private static final Logger LOG = LoggerFactory.getLogger(CourseWeekInfoResource.class);

    private static final String ENTITY_NAME = "courseWeekInfo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CourseWeekInfoService courseWeekInfoService;

    private final CourseWeekInfoRepository courseWeekInfoRepository;

    public CourseWeekInfoResource(CourseWeekInfoService courseWeekInfoService, CourseWeekInfoRepository courseWeekInfoRepository) {
        this.courseWeekInfoService = courseWeekInfoService;
        this.courseWeekInfoRepository = courseWeekInfoRepository;
    }

    /**
     * {@code POST  /course-week-infos} : Create a new courseWeekInfo.
     *
     * @param courseWeekInfoDTO the courseWeekInfoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new courseWeekInfoDTO, or with status {@code 400 (Bad Request)} if the courseWeekInfo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CourseWeekInfoDTO> createCourseWeekInfo(@RequestBody CourseWeekInfoDTO courseWeekInfoDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save CourseWeekInfo : {}", courseWeekInfoDTO);
        if (courseWeekInfoDTO.getId() != null) {
            throw new BadRequestAlertException("A new courseWeekInfo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        courseWeekInfoDTO = courseWeekInfoService.save(courseWeekInfoDTO);
        return ResponseEntity.created(new URI("/api/course-week-infos/" + courseWeekInfoDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, courseWeekInfoDTO.getId().toString()))
            .body(courseWeekInfoDTO);
    }

    /**
     * {@code PUT  /course-week-infos/:id} : Updates an existing courseWeekInfo.
     *
     * @param id the id of the courseWeekInfoDTO to save.
     * @param courseWeekInfoDTO the courseWeekInfoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courseWeekInfoDTO,
     * or with status {@code 400 (Bad Request)} if the courseWeekInfoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the courseWeekInfoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CourseWeekInfoDTO> updateCourseWeekInfo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CourseWeekInfoDTO courseWeekInfoDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CourseWeekInfo : {}, {}", id, courseWeekInfoDTO);
        if (courseWeekInfoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courseWeekInfoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courseWeekInfoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        courseWeekInfoDTO = courseWeekInfoService.update(courseWeekInfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courseWeekInfoDTO.getId().toString()))
            .body(courseWeekInfoDTO);
    }

    /**
     * {@code PATCH  /course-week-infos/:id} : Partial updates given fields of an existing courseWeekInfo, field will ignore if it is null
     *
     * @param id the id of the courseWeekInfoDTO to save.
     * @param courseWeekInfoDTO the courseWeekInfoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated courseWeekInfoDTO,
     * or with status {@code 400 (Bad Request)} if the courseWeekInfoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the courseWeekInfoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the courseWeekInfoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CourseWeekInfoDTO> partialUpdateCourseWeekInfo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CourseWeekInfoDTO courseWeekInfoDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CourseWeekInfo partially : {}, {}", id, courseWeekInfoDTO);
        if (courseWeekInfoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, courseWeekInfoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!courseWeekInfoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CourseWeekInfoDTO> result = courseWeekInfoService.partialUpdate(courseWeekInfoDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, courseWeekInfoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /course-week-infos} : get all the courseWeekInfos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of courseWeekInfos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CourseWeekInfoDTO>> getAllCourseWeekInfos(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of CourseWeekInfos");
        Page<CourseWeekInfoDTO> page = courseWeekInfoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /course-week-infos/:id} : get the "id" courseWeekInfo.
     *
     * @param id the id of the courseWeekInfoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the courseWeekInfoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CourseWeekInfoDTO> getCourseWeekInfo(@PathVariable("id") Long id) {
        LOG.debug("REST request to get CourseWeekInfo : {}", id);
        Optional<CourseWeekInfoDTO> courseWeekInfoDTO = courseWeekInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(courseWeekInfoDTO);
    }

    /**
     * {@code DELETE  /course-week-infos/:id} : delete the "id" courseWeekInfo.
     *
     * @param id the id of the courseWeekInfoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCourseWeekInfo(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete CourseWeekInfo : {}", id);
        courseWeekInfoService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
