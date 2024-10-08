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
import uz.momoit.lms_canvas.repository.CommunityAttachmentRepository;
import uz.momoit.lms_canvas.service.CommunityAttachmentService;
import uz.momoit.lms_canvas.service.dto.CommunityAttachmentDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.CommunityAttachment}.
 */
@RestController
@RequestMapping("/api/community-attachments")
public class CommunityAttachmentResource {

    private static final Logger LOG = LoggerFactory.getLogger(CommunityAttachmentResource.class);

    private static final String ENTITY_NAME = "communityAttachment";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommunityAttachmentService communityAttachmentService;

    private final CommunityAttachmentRepository communityAttachmentRepository;

    public CommunityAttachmentResource(
        CommunityAttachmentService communityAttachmentService,
        CommunityAttachmentRepository communityAttachmentRepository
    ) {
        this.communityAttachmentService = communityAttachmentService;
        this.communityAttachmentRepository = communityAttachmentRepository;
    }

    /**
     * {@code POST  /community-attachments} : Create a new communityAttachment.
     *
     * @param communityAttachmentDTO the communityAttachmentDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new communityAttachmentDTO, or with status {@code 400 (Bad Request)} if the communityAttachment has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CommunityAttachmentDTO> createCommunityAttachment(@RequestBody CommunityAttachmentDTO communityAttachmentDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save CommunityAttachment : {}", communityAttachmentDTO);
        if (communityAttachmentDTO.getId() != null) {
            throw new BadRequestAlertException("A new communityAttachment cannot already have an ID", ENTITY_NAME, "idexists");
        }
        communityAttachmentDTO = communityAttachmentService.save(communityAttachmentDTO);
        return ResponseEntity.created(new URI("/api/community-attachments/" + communityAttachmentDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, communityAttachmentDTO.getId().toString()))
            .body(communityAttachmentDTO);
    }

    /**
     * {@code PUT  /community-attachments/:id} : Updates an existing communityAttachment.
     *
     * @param id the id of the communityAttachmentDTO to save.
     * @param communityAttachmentDTO the communityAttachmentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated communityAttachmentDTO,
     * or with status {@code 400 (Bad Request)} if the communityAttachmentDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the communityAttachmentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CommunityAttachmentDTO> updateCommunityAttachment(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommunityAttachmentDTO communityAttachmentDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CommunityAttachment : {}, {}", id, communityAttachmentDTO);
        if (communityAttachmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, communityAttachmentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!communityAttachmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        communityAttachmentDTO = communityAttachmentService.update(communityAttachmentDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, communityAttachmentDTO.getId().toString()))
            .body(communityAttachmentDTO);
    }

    /**
     * {@code PATCH  /community-attachments/:id} : Partial updates given fields of an existing communityAttachment, field will ignore if it is null
     *
     * @param id the id of the communityAttachmentDTO to save.
     * @param communityAttachmentDTO the communityAttachmentDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated communityAttachmentDTO,
     * or with status {@code 400 (Bad Request)} if the communityAttachmentDTO is not valid,
     * or with status {@code 404 (Not Found)} if the communityAttachmentDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the communityAttachmentDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CommunityAttachmentDTO> partialUpdateCommunityAttachment(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommunityAttachmentDTO communityAttachmentDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CommunityAttachment partially : {}, {}", id, communityAttachmentDTO);
        if (communityAttachmentDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, communityAttachmentDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!communityAttachmentRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CommunityAttachmentDTO> result = communityAttachmentService.partialUpdate(communityAttachmentDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, communityAttachmentDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /community-attachments} : get all the communityAttachments.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of communityAttachments in body.
     */
    @GetMapping("")
    public List<CommunityAttachmentDTO> getAllCommunityAttachments() {
        LOG.debug("REST request to get all CommunityAttachments");
        return communityAttachmentService.findAll();
    }

    /**
     * {@code GET  /community-attachments/:id} : get the "id" communityAttachment.
     *
     * @param id the id of the communityAttachmentDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the communityAttachmentDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CommunityAttachmentDTO> getCommunityAttachment(@PathVariable("id") Long id) {
        LOG.debug("REST request to get CommunityAttachment : {}", id);
        Optional<CommunityAttachmentDTO> communityAttachmentDTO = communityAttachmentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(communityAttachmentDTO);
    }

    /**
     * {@code DELETE  /community-attachments/:id} : delete the "id" communityAttachment.
     *
     * @param id the id of the communityAttachmentDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunityAttachment(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete CommunityAttachment : {}", id);
        communityAttachmentService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
