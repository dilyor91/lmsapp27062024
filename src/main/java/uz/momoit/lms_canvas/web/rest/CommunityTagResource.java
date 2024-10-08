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
import uz.momoit.lms_canvas.repository.CommunityTagRepository;
import uz.momoit.lms_canvas.service.CommunityTagService;
import uz.momoit.lms_canvas.service.dto.CommunityTagDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.CommunityTag}.
 */
@RestController
@RequestMapping("/api/community-tags")
public class CommunityTagResource {

    private static final Logger LOG = LoggerFactory.getLogger(CommunityTagResource.class);

    private static final String ENTITY_NAME = "communityTag";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommunityTagService communityTagService;

    private final CommunityTagRepository communityTagRepository;

    public CommunityTagResource(CommunityTagService communityTagService, CommunityTagRepository communityTagRepository) {
        this.communityTagService = communityTagService;
        this.communityTagRepository = communityTagRepository;
    }

    /**
     * {@code POST  /community-tags} : Create a new communityTag.
     *
     * @param communityTagDTO the communityTagDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new communityTagDTO, or with status {@code 400 (Bad Request)} if the communityTag has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CommunityTagDTO> createCommunityTag(@RequestBody CommunityTagDTO communityTagDTO) throws URISyntaxException {
        LOG.debug("REST request to save CommunityTag : {}", communityTagDTO);
        if (communityTagDTO.getId() != null) {
            throw new BadRequestAlertException("A new communityTag cannot already have an ID", ENTITY_NAME, "idexists");
        }
        communityTagDTO = communityTagService.save(communityTagDTO);
        return ResponseEntity.created(new URI("/api/community-tags/" + communityTagDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, communityTagDTO.getId().toString()))
            .body(communityTagDTO);
    }

    /**
     * {@code PUT  /community-tags/:id} : Updates an existing communityTag.
     *
     * @param id the id of the communityTagDTO to save.
     * @param communityTagDTO the communityTagDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated communityTagDTO,
     * or with status {@code 400 (Bad Request)} if the communityTagDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the communityTagDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CommunityTagDTO> updateCommunityTag(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommunityTagDTO communityTagDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CommunityTag : {}, {}", id, communityTagDTO);
        if (communityTagDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, communityTagDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!communityTagRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        communityTagDTO = communityTagService.update(communityTagDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, communityTagDTO.getId().toString()))
            .body(communityTagDTO);
    }

    /**
     * {@code PATCH  /community-tags/:id} : Partial updates given fields of an existing communityTag, field will ignore if it is null
     *
     * @param id the id of the communityTagDTO to save.
     * @param communityTagDTO the communityTagDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated communityTagDTO,
     * or with status {@code 400 (Bad Request)} if the communityTagDTO is not valid,
     * or with status {@code 404 (Not Found)} if the communityTagDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the communityTagDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CommunityTagDTO> partialUpdateCommunityTag(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommunityTagDTO communityTagDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CommunityTag partially : {}, {}", id, communityTagDTO);
        if (communityTagDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, communityTagDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!communityTagRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CommunityTagDTO> result = communityTagService.partialUpdate(communityTagDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, communityTagDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /community-tags} : get all the communityTags.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of communityTags in body.
     */
    @GetMapping("")
    public List<CommunityTagDTO> getAllCommunityTags() {
        LOG.debug("REST request to get all CommunityTags");
        return communityTagService.findAll();
    }

    /**
     * {@code GET  /community-tags/:id} : get the "id" communityTag.
     *
     * @param id the id of the communityTagDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the communityTagDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CommunityTagDTO> getCommunityTag(@PathVariable("id") Long id) {
        LOG.debug("REST request to get CommunityTag : {}", id);
        Optional<CommunityTagDTO> communityTagDTO = communityTagService.findOne(id);
        return ResponseUtil.wrapOrNotFound(communityTagDTO);
    }

    /**
     * {@code DELETE  /community-tags/:id} : delete the "id" communityTag.
     *
     * @param id the id of the communityTagDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommunityTag(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete CommunityTag : {}", id);
        communityTagService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
