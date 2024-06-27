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
import uz.momoit.lms_canvas.repository.AttendanceDetailRepository;
import uz.momoit.lms_canvas.service.AttendanceDetailService;
import uz.momoit.lms_canvas.service.dto.AttendanceDetailDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.AttendanceDetail}.
 */
@RestController
@RequestMapping("/api/attendance-details")
public class AttendanceDetailResource {

    private static final Logger log = LoggerFactory.getLogger(AttendanceDetailResource.class);

    private static final String ENTITY_NAME = "attendanceDetail";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AttendanceDetailService attendanceDetailService;

    private final AttendanceDetailRepository attendanceDetailRepository;

    public AttendanceDetailResource(
        AttendanceDetailService attendanceDetailService,
        AttendanceDetailRepository attendanceDetailRepository
    ) {
        this.attendanceDetailService = attendanceDetailService;
        this.attendanceDetailRepository = attendanceDetailRepository;
    }

    /**
     * {@code POST  /attendance-details} : Create a new attendanceDetail.
     *
     * @param attendanceDetailDTO the attendanceDetailDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new attendanceDetailDTO, or with status {@code 400 (Bad Request)} if the attendanceDetail has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<AttendanceDetailDTO> createAttendanceDetail(@RequestBody AttendanceDetailDTO attendanceDetailDTO)
        throws URISyntaxException {
        log.debug("REST request to save AttendanceDetail : {}", attendanceDetailDTO);
        if (attendanceDetailDTO.getId() != null) {
            throw new BadRequestAlertException("A new attendanceDetail cannot already have an ID", ENTITY_NAME, "idexists");
        }
        attendanceDetailDTO = attendanceDetailService.save(attendanceDetailDTO);
        return ResponseEntity.created(new URI("/api/attendance-details/" + attendanceDetailDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, attendanceDetailDTO.getId().toString()))
            .body(attendanceDetailDTO);
    }

    /**
     * {@code PUT  /attendance-details/:id} : Updates an existing attendanceDetail.
     *
     * @param id the id of the attendanceDetailDTO to save.
     * @param attendanceDetailDTO the attendanceDetailDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attendanceDetailDTO,
     * or with status {@code 400 (Bad Request)} if the attendanceDetailDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the attendanceDetailDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<AttendanceDetailDTO> updateAttendanceDetail(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AttendanceDetailDTO attendanceDetailDTO
    ) throws URISyntaxException {
        log.debug("REST request to update AttendanceDetail : {}, {}", id, attendanceDetailDTO);
        if (attendanceDetailDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, attendanceDetailDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!attendanceDetailRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        attendanceDetailDTO = attendanceDetailService.update(attendanceDetailDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, attendanceDetailDTO.getId().toString()))
            .body(attendanceDetailDTO);
    }

    /**
     * {@code PATCH  /attendance-details/:id} : Partial updates given fields of an existing attendanceDetail, field will ignore if it is null
     *
     * @param id the id of the attendanceDetailDTO to save.
     * @param attendanceDetailDTO the attendanceDetailDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated attendanceDetailDTO,
     * or with status {@code 400 (Bad Request)} if the attendanceDetailDTO is not valid,
     * or with status {@code 404 (Not Found)} if the attendanceDetailDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the attendanceDetailDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<AttendanceDetailDTO> partialUpdateAttendanceDetail(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody AttendanceDetailDTO attendanceDetailDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update AttendanceDetail partially : {}, {}", id, attendanceDetailDTO);
        if (attendanceDetailDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, attendanceDetailDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!attendanceDetailRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<AttendanceDetailDTO> result = attendanceDetailService.partialUpdate(attendanceDetailDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, attendanceDetailDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /attendance-details} : get all the attendanceDetails.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of attendanceDetails in body.
     */
    @GetMapping("")
    public ResponseEntity<List<AttendanceDetailDTO>> getAllAttendanceDetails(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of AttendanceDetails");
        Page<AttendanceDetailDTO> page = attendanceDetailService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /attendance-details/:id} : get the "id" attendanceDetail.
     *
     * @param id the id of the attendanceDetailDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the attendanceDetailDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<AttendanceDetailDTO> getAttendanceDetail(@PathVariable("id") Long id) {
        log.debug("REST request to get AttendanceDetail : {}", id);
        Optional<AttendanceDetailDTO> attendanceDetailDTO = attendanceDetailService.findOne(id);
        return ResponseUtil.wrapOrNotFound(attendanceDetailDTO);
    }

    /**
     * {@code DELETE  /attendance-details/:id} : delete the "id" attendanceDetail.
     *
     * @param id the id of the attendanceDetailDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAttendanceDetail(@PathVariable("id") Long id) {
        log.debug("REST request to delete AttendanceDetail : {}", id);
        attendanceDetailService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
