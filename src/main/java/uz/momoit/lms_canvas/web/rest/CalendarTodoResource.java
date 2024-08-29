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
import uz.momoit.lms_canvas.repository.CalendarTodoRepository;
import uz.momoit.lms_canvas.service.CalendarTodoService;
import uz.momoit.lms_canvas.service.dto.CalendarTodoDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.CalendarTodo}.
 */
@RestController
@RequestMapping("/api/calendar-todos")
public class CalendarTodoResource {

    private static final Logger LOG = LoggerFactory.getLogger(CalendarTodoResource.class);

    private static final String ENTITY_NAME = "calendarTodo";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CalendarTodoService calendarTodoService;

    private final CalendarTodoRepository calendarTodoRepository;

    public CalendarTodoResource(CalendarTodoService calendarTodoService, CalendarTodoRepository calendarTodoRepository) {
        this.calendarTodoService = calendarTodoService;
        this.calendarTodoRepository = calendarTodoRepository;
    }

    /**
     * {@code POST  /calendar-todos} : Create a new calendarTodo.
     *
     * @param calendarTodoDTO the calendarTodoDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new calendarTodoDTO, or with status {@code 400 (Bad Request)} if the calendarTodo has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CalendarTodoDTO> createCalendarTodo(@RequestBody CalendarTodoDTO calendarTodoDTO) throws URISyntaxException {
        LOG.debug("REST request to save CalendarTodo : {}", calendarTodoDTO);
        if (calendarTodoDTO.getId() != null) {
            throw new BadRequestAlertException("A new calendarTodo cannot already have an ID", ENTITY_NAME, "idexists");
        }
        calendarTodoDTO = calendarTodoService.save(calendarTodoDTO);
        return ResponseEntity.created(new URI("/api/calendar-todos/" + calendarTodoDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, calendarTodoDTO.getId().toString()))
            .body(calendarTodoDTO);
    }

    /**
     * {@code PUT  /calendar-todos/:id} : Updates an existing calendarTodo.
     *
     * @param id the id of the calendarTodoDTO to save.
     * @param calendarTodoDTO the calendarTodoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated calendarTodoDTO,
     * or with status {@code 400 (Bad Request)} if the calendarTodoDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the calendarTodoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CalendarTodoDTO> updateCalendarTodo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CalendarTodoDTO calendarTodoDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update CalendarTodo : {}, {}", id, calendarTodoDTO);
        if (calendarTodoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, calendarTodoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!calendarTodoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        calendarTodoDTO = calendarTodoService.update(calendarTodoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, calendarTodoDTO.getId().toString()))
            .body(calendarTodoDTO);
    }

    /**
     * {@code PATCH  /calendar-todos/:id} : Partial updates given fields of an existing calendarTodo, field will ignore if it is null
     *
     * @param id the id of the calendarTodoDTO to save.
     * @param calendarTodoDTO the calendarTodoDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated calendarTodoDTO,
     * or with status {@code 400 (Bad Request)} if the calendarTodoDTO is not valid,
     * or with status {@code 404 (Not Found)} if the calendarTodoDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the calendarTodoDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CalendarTodoDTO> partialUpdateCalendarTodo(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CalendarTodoDTO calendarTodoDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update CalendarTodo partially : {}, {}", id, calendarTodoDTO);
        if (calendarTodoDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, calendarTodoDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!calendarTodoRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CalendarTodoDTO> result = calendarTodoService.partialUpdate(calendarTodoDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, calendarTodoDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /calendar-todos} : get all the calendarTodos.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of calendarTodos in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CalendarTodoDTO>> getAllCalendarTodos(@org.springdoc.core.annotations.ParameterObject Pageable pageable) {
        LOG.debug("REST request to get a page of CalendarTodos");
        Page<CalendarTodoDTO> page = calendarTodoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /calendar-todos/:id} : get the "id" calendarTodo.
     *
     * @param id the id of the calendarTodoDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the calendarTodoDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CalendarTodoDTO> getCalendarTodo(@PathVariable("id") Long id) {
        LOG.debug("REST request to get CalendarTodo : {}", id);
        Optional<CalendarTodoDTO> calendarTodoDTO = calendarTodoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(calendarTodoDTO);
    }

    /**
     * {@code DELETE  /calendar-todos/:id} : delete the "id" calendarTodo.
     *
     * @param id the id of the calendarTodoDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCalendarTodo(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete CalendarTodo : {}", id);
        calendarTodoService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
