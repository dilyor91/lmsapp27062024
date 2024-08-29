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
import uz.momoit.lms_canvas.repository.LessonMaterialRepository;
import uz.momoit.lms_canvas.service.LessonMaterialService;
import uz.momoit.lms_canvas.service.dto.LessonMaterialDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.LessonMaterial}.
 */
@RestController
@RequestMapping("/api/lesson-materials")
public class LessonMaterialResource {

    private static final Logger LOG = LoggerFactory.getLogger(LessonMaterialResource.class);

    private static final String ENTITY_NAME = "lessonMaterial";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final LessonMaterialService lessonMaterialService;

    private final LessonMaterialRepository lessonMaterialRepository;

    public LessonMaterialResource(LessonMaterialService lessonMaterialService, LessonMaterialRepository lessonMaterialRepository) {
        this.lessonMaterialService = lessonMaterialService;
        this.lessonMaterialRepository = lessonMaterialRepository;
    }

    /**
     * {@code POST  /lesson-materials} : Create a new lessonMaterial.
     *
     * @param lessonMaterialDTO the lessonMaterialDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new lessonMaterialDTO, or with status {@code 400 (Bad Request)} if the lessonMaterial has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<LessonMaterialDTO> createLessonMaterial(@RequestBody LessonMaterialDTO lessonMaterialDTO)
        throws URISyntaxException {
        LOG.debug("REST request to save LessonMaterial : {}", lessonMaterialDTO);
        if (lessonMaterialDTO.getId() != null) {
            throw new BadRequestAlertException("A new lessonMaterial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        lessonMaterialDTO = lessonMaterialService.save(lessonMaterialDTO);
        return ResponseEntity.created(new URI("/api/lesson-materials/" + lessonMaterialDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, lessonMaterialDTO.getId().toString()))
            .body(lessonMaterialDTO);
    }

    /**
     * {@code PUT  /lesson-materials/:id} : Updates an existing lessonMaterial.
     *
     * @param id the id of the lessonMaterialDTO to save.
     * @param lessonMaterialDTO the lessonMaterialDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lessonMaterialDTO,
     * or with status {@code 400 (Bad Request)} if the lessonMaterialDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the lessonMaterialDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<LessonMaterialDTO> updateLessonMaterial(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LessonMaterialDTO lessonMaterialDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update LessonMaterial : {}, {}", id, lessonMaterialDTO);
        if (lessonMaterialDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lessonMaterialDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lessonMaterialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        lessonMaterialDTO = lessonMaterialService.update(lessonMaterialDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lessonMaterialDTO.getId().toString()))
            .body(lessonMaterialDTO);
    }

    /**
     * {@code PATCH  /lesson-materials/:id} : Partial updates given fields of an existing lessonMaterial, field will ignore if it is null
     *
     * @param id the id of the lessonMaterialDTO to save.
     * @param lessonMaterialDTO the lessonMaterialDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated lessonMaterialDTO,
     * or with status {@code 400 (Bad Request)} if the lessonMaterialDTO is not valid,
     * or with status {@code 404 (Not Found)} if the lessonMaterialDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the lessonMaterialDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<LessonMaterialDTO> partialUpdateLessonMaterial(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody LessonMaterialDTO lessonMaterialDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update LessonMaterial partially : {}, {}", id, lessonMaterialDTO);
        if (lessonMaterialDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, lessonMaterialDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!lessonMaterialRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<LessonMaterialDTO> result = lessonMaterialService.partialUpdate(lessonMaterialDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, lessonMaterialDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /lesson-materials} : get all the lessonMaterials.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of lessonMaterials in body.
     */
    @GetMapping("")
    public ResponseEntity<List<LessonMaterialDTO>> getAllLessonMaterials(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        LOG.debug("REST request to get a page of LessonMaterials");
        Page<LessonMaterialDTO> page = lessonMaterialService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /lesson-materials/:id} : get the "id" lessonMaterial.
     *
     * @param id the id of the lessonMaterialDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the lessonMaterialDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<LessonMaterialDTO> getLessonMaterial(@PathVariable("id") Long id) {
        LOG.debug("REST request to get LessonMaterial : {}", id);
        Optional<LessonMaterialDTO> lessonMaterialDTO = lessonMaterialService.findOne(id);
        return ResponseUtil.wrapOrNotFound(lessonMaterialDTO);
    }

    /**
     * {@code DELETE  /lesson-materials/:id} : delete the "id" lessonMaterial.
     *
     * @param id the id of the lessonMaterialDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLessonMaterial(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete LessonMaterial : {}", id);
        lessonMaterialService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
