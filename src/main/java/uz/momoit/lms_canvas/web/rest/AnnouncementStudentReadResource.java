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
import uz.momoit.lms_canvas.repository.AnnouncementStudentReadRepository;
import uz.momoit.lms_canvas.service.AnnouncementStudentReadService;
import uz.momoit.lms_canvas.service.dto.AnnouncementStudentReadDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.AnnouncementStudentRead}.
 */
@RestController
@RequestMapping("/api/announcement-student-reads")
public class AnnouncementStudentReadResource {

    private static final Logger LOG = LoggerFactory.getLogger(AnnouncementStudentReadResource.class);

    private static final String ENTITY_NAME = "announcementStudentRead";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AnnouncementStudentReadService announcementStudentReadService;

    private final AnnouncementStudentReadRepository announcementStudentReadRepository;

    public AnnouncementStudentReadResource(
        AnnouncementStudentReadService announcementStudentReadService,
        AnnouncementStudentReadRepository announcementStudentReadRepository
    ) {
        this.announcementStudentReadService = announcementStudentReadService;
        this.announcementStudentReadRepository = announcementStudentReadRepository;
    }

    /**
     * {@code POST  /announcement-student-reads} : Create a new announcementStudentRead.
     *
     * @param announcementStudentReadDTO the announcementStudentReadDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new announcementStudentReadDTO, or with status {@code 400 (Bad Request)} if the announcementStudentRead has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AnnouncementStudentReadDTO> createAnnouncementStudentRead(
        @RequestBody AnnouncementStudentReadDTO announcementStudentReadDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to save AnnouncementStudentRead : {}", announcementStudentReadDTO);
        if (announcementStudentReadDTO.getId() != null) {
            throw new BadRequestAlertException("A new announcementStudentRead cannot already have an ID", ENTITY_NAME, "idexists");
        }
        announcementStudentReadDTO = announcementStudentReadService.save(announcementStudentReadDTO);
        return ResponseEntity.created(new URI("/api/announcement-student-reads/" + announcementStudentReadDTO.getId()))
            .headers(
                HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, announcementStudentReadDTO.getId().toString())
            )
            .body(announcementStudentReadDTO);
    }

    /**
     * {@code PUT  /announcement-student-reads/:id} : Updates an existing announcementStudentRead.
     *
     * @param id the id of the announcementStudentReadDTO to save.
     * @param announcementStudentReadDTO the announcementStudentReadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated announcementStudentReadDTO,
     * or with status {@code 400 (Bad Request)} if the announcementStudentReadDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the announcementStudentReadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AnnouncementStudentReadDTO> updateAnnouncementStudentRead(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AnnouncementStudentReadDTO announcementStudentReadDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update AnnouncementStudentRead : {}, {}", id, announcementStudentReadDTO);
        if (announcementStudentReadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, announcementStudentReadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!announcementStudentReadRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        announcementStudentReadDTO = announcementStudentReadService.update(announcementStudentReadDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, announcementStudentReadDTO.getId().toString()))
            .body(announcementStudentReadDTO);
    }

    /**
     * {@code PATCH  /announcement-student-reads/:id} : Partial updates given fields of an existing announcementStudentRead, field will ignore if it is null
     *
     * @param id the id of the announcementStudentReadDTO to save.
     * @param announcementStudentReadDTO the announcementStudentReadDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated announcementStudentReadDTO,
     * or with status {@code 400 (Bad Request)} if the announcementStudentReadDTO is not valid,
     * or with status {@code 404 (Not Found)} if the announcementStudentReadDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the announcementStudentReadDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AnnouncementStudentReadDTO> partialUpdateAnnouncementStudentRead(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AnnouncementStudentReadDTO announcementStudentReadDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update AnnouncementStudentRead partially : {}, {}", id, announcementStudentReadDTO);
        if (announcementStudentReadDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, announcementStudentReadDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!announcementStudentReadRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AnnouncementStudentReadDTO> result = announcementStudentReadService.partialUpdate(announcementStudentReadDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, announcementStudentReadDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /announcement-student-reads} : get all the announcementStudentReads.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of announcementStudentReads in body.
     */
    @GetMapping("")
    public ResponseEntity<List<AnnouncementStudentReadDTO>> getAllAnnouncementStudentReads(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of AnnouncementStudentReads");
        Page<AnnouncementStudentReadDTO> page = announcementStudentReadService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /announcement-student-reads/:id} : get the "id" announcementStudentRead.
     *
     * @param id the id of the announcementStudentReadDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the announcementStudentReadDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AnnouncementStudentReadDTO> getAnnouncementStudentRead(@PathVariable("id") Long id) {
        LOG.debug("REST request to get AnnouncementStudentRead : {}", id);
        Optional<AnnouncementStudentReadDTO> announcementStudentReadDTO = announcementStudentReadService.findOne(id);
        return ResponseUtil.wrapOrNotFound(announcementStudentReadDTO);
    }

    /**
     * {@code DELETE  /announcement-student-reads/:id} : delete the "id" announcementStudentRead.
     *
     * @param id the id of the announcementStudentReadDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAnnouncementStudentRead(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete AnnouncementStudentRead : {}", id);
        announcementStudentReadService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
