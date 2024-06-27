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
import uz.momoit.lms_canvas.repository.WikiPageRepository;
import uz.momoit.lms_canvas.service.WikiPageService;
import uz.momoit.lms_canvas.service.dto.WikiPageDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.WikiPage}.
 */
@RestController
@RequestMapping("/api/wiki-pages")
public class WikiPageResource {

    private static final Logger log = LoggerFactory.getLogger(WikiPageResource.class);

    private static final String ENTITY_NAME = "wikiPage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final WikiPageService wikiPageService;

    private final WikiPageRepository wikiPageRepository;

    public WikiPageResource(WikiPageService wikiPageService, WikiPageRepository wikiPageRepository) {
        this.wikiPageService = wikiPageService;
        this.wikiPageRepository = wikiPageRepository;
    }

    /**
     * {@code POST  /wiki-pages} : Create a new wikiPage.
     *
     * @param wikiPageDTO the wikiPageDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new wikiPageDTO, or with status {@code 400 (Bad Request)} if the wikiPage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<WikiPageDTO> createWikiPage(@RequestBody WikiPageDTO wikiPageDTO) throws URISyntaxException {
        log.debug("REST request to save WikiPage : {}", wikiPageDTO);
        if (wikiPageDTO.getId() != null) {
            throw new BadRequestAlertException("A new wikiPage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        wikiPageDTO = wikiPageService.save(wikiPageDTO);
        return ResponseEntity.created(new URI("/api/wiki-pages/" + wikiPageDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, wikiPageDTO.getId().toString()))
            .body(wikiPageDTO);
    }

    /**
     * {@code PUT  /wiki-pages/:id} : Updates an existing wikiPage.
     *
     * @param id the id of the wikiPageDTO to save.
     * @param wikiPageDTO the wikiPageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wikiPageDTO,
     * or with status {@code 400 (Bad Request)} if the wikiPageDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the wikiPageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<WikiPageDTO> updateWikiPage(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody WikiPageDTO wikiPageDTO
    ) throws URISyntaxException {
        log.debug("REST request to update WikiPage : {}, {}", id, wikiPageDTO);
        if (wikiPageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wikiPageDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wikiPageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        wikiPageDTO = wikiPageService.update(wikiPageDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, wikiPageDTO.getId().toString()))
            .body(wikiPageDTO);
    }

    /**
     * {@code PATCH  /wiki-pages/:id} : Partial updates given fields of an existing wikiPage, field will ignore if it is null
     *
     * @param id the id of the wikiPageDTO to save.
     * @param wikiPageDTO the wikiPageDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated wikiPageDTO,
     * or with status {@code 400 (Bad Request)} if the wikiPageDTO is not valid,
     * or with status {@code 404 (Not Found)} if the wikiPageDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the wikiPageDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<WikiPageDTO> partialUpdateWikiPage(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody WikiPageDTO wikiPageDTO
    ) throws URISyntaxException {
        log.debug("REST request to partial update WikiPage partially : {}, {}", id, wikiPageDTO);
        if (wikiPageDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, wikiPageDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!wikiPageRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<WikiPageDTO> result = wikiPageService.partialUpdate(wikiPageDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, wikiPageDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /wiki-pages} : get all the wikiPages.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of wikiPages in body.
     */
    @GetMapping("")
    public ResponseEntity<List<WikiPageDTO>> getAllWikiPages(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        log.debug("REST request to get a page of WikiPages");
        Page<WikiPageDTO> page = wikiPageService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /wiki-pages/:id} : get the "id" wikiPage.
     *
     * @param id the id of the wikiPageDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the wikiPageDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<WikiPageDTO> getWikiPage(@PathVariable("id") Long id) {
        log.debug("REST request to get WikiPage : {}", id);
        Optional<WikiPageDTO> wikiPageDTO = wikiPageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(wikiPageDTO);
    }

    /**
     * {@code DELETE  /wiki-pages/:id} : delete the "id" wikiPage.
     *
     * @param id the id of the wikiPageDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteWikiPage(@PathVariable("id") Long id) {
        log.debug("REST request to delete WikiPage : {}", id);
        wikiPageService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
