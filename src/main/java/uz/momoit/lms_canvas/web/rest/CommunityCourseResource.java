package uz.momoit.lms_canvas.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.ResponseUtil;
import uz.momoit.lms_canvas.repository.CommunityCourseRepository;
import uz.momoit.lms_canvas.service.CommunityCourseService;
import uz.momoit.lms_canvas.service.dto.CommunityCourseDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.CommunityCourse}.
 */
@RestController
@RequestMapping("/api/community-courses")
public class CommunityCourseResource {

    private static final Logger LOG = LoggerFactory.getLogger(CommunityCourseResource.class);

    private static final String ENTITY_NAME = "communityCourse";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommunityCourseService communityCourseService;

    private final CommunityCourseRepository communityCourseRepository;

    public CommunityCourseResource(CommunityCourseService communityCourseService, CommunityCourseRepository communityCourseRepository) {
        this.communityCourseService = communityCourseService;
        this.communityCourseRepository = communityCourseRepository;
    }

    /**
     * {@code POST  /community-courses} : Create a new communityCourse.
     *
     * @param communityCourseDTO the communityCourseDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new communityCourseDTO, or with status {@code 400 (Bad Request)} if the communityCourse has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CommunityCourseDTO> createCommunityCourse(@RequestBody CommunityCourseDTO communityCourseDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save CommunityCourse : {}", communityCourseDTO);
        if (communityCourseDTO.getId() != null) {
            throw new BadRequestAlertException("A new communityCourse cannot already have an ID", ENTITY_NAME, "idexists");
        }
        communityCourseDTO = communityCourseService.save(communityCourseDTO);
        return ResponseEntity.created(new URI("/api/community-courses/" + communityCourseDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, communityCourseDTO.getId().toString()))
            .body(communityCourseDTO);
    }

    /**
     * {@code PUT  /community-courses/:id} : Updates an existing communityCourse.
     *
     * @param id the id of the communityCourseDTO to save.
     * @param communityCourseDTO the communityCourseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated communityCourseDTO,
     * or with status {@code 400 (Bad Request)} if the communityCourseDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the communityCourseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CommunityCourseDTO> updateCommunityCourse(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommunityCourseDTO communityCourseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CommunityCourse : {}, {}", id, communityCourseDTO);
        if (communityCourseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, communityCourseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!communityCourseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        communityCourseDTO = communityCourseService.update(communityCourseDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, communityCourseDTO.getId().toString()))
            .body(communityCourseDTO);
    }

    /**
     * {@code PATCH  /community-courses/:id} : Partial updates given fields of an existing communityCourse, field will ignore if it is null
     *
     * @param id the id of the communityCourseDTO to save.
     * @param communityCourseDTO the communityCourseDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated communityCourseDTO,
     * or with status {@code 400 (Bad Request)} if the communityCourseDTO is not valid,
     * or with status {@code 404 (Not Found)} if the communityCourseDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the communityCourseDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CommunityCourseDTO> partialUpdateCommunityCourse(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommunityCourseDTO communityCourseDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CommunityCourse partially : {}, {}", id, communityCourseDTO);
        if (communityCourseDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, communityCourseDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!communityCourseRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CommunityCourseDTO> result = communityCourseService.partialUpdate(communityCourseDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, communityCourseDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /community-courses} : get all the communityCourses.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of communityCourses in body.
     */
    @GetMapping("")
    public List<CommunityCourseDTO> getAllCommunityCourses() {
        LOG.debug("REST request to get all CommunityCourses");
        return communityCourseService.findAll();
    }

    /**
     * {@code GET  /community-courses/:id} : get the "id" communityCourse.
     *
     * @param id the id of the communityCourseDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the communityCourseDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CommunityCourseDTO> getCommunityCourse(@PathVariable("id") Long id) {
        LOG.debug("REST request to get CommunityCourse : {}", id);
        Optional<CommunityCourseDTO> communityCourseDTO = communityCourseService.findOne(id);
        return ResponseUtil.wrapOrNotFound(communityCourseDTO);
    }

    /**
     * {@code DELETE  /community-courses/:id} : delete the "id" communityCourse.
     *
     * @param id the id of the communityCourseDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunityCourse(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete CommunityCourse : {}", id);
        communityCourseService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
