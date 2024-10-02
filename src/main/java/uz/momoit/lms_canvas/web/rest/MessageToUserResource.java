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
import uz.momoit.lms_canvas.repository.MessageToUserRepository;
import uz.momoit.lms_canvas.service.MessageToUserService;
import uz.momoit.lms_canvas.service.dto.MessageToUserDTO;
import uz.momoit.lms_canvas.web.rest.errors.BadRequestAlertException;

/**
 * REST controller for managing {@link uz.momoit.lms_canvas.domain.MessageToUser}.
 */
@RestController
@RequestMapping("/api/message-to-users")
public class MessageToUserResource {

    private static final Logger LOG = LoggerFactory.getLogger(MessageToUserResource.class);

    private static final String ENTITY_NAME = "messageToUser";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final MessageToUserService messageToUserService;

    private final MessageToUserRepository messageToUserRepository;

    public MessageToUserResource(MessageToUserService messageToUserService, MessageToUserRepository messageToUserRepository) {
        this.messageToUserService = messageToUserService;
        this.messageToUserRepository = messageToUserRepository;
    }

    /**
     * {@code POST  /message-to-users} : Create a new messageToUser.
     *
     * @param messageToUserDTO the messageToUserDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new messageToUserDTO, or with status {@code 400 (Bad Request)} if the messageToUser has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<MessageToUserDTO> createMessageToUser(@RequestBody MessageToUserDTO messageToUserDTO) throws URISyntaxException {
        LOG.debug("REST request to save MessageToUser : {}", messageToUserDTO);
        if (messageToUserDTO.getId() != null) {
            throw new BadRequestAlertException("A new messageToUser cannot already have an ID", ENTITY_NAME, "idexists");
        }
        messageToUserDTO = messageToUserService.save(messageToUserDTO);
        return ResponseEntity.created(new URI("/api/message-to-users/" + messageToUserDTO.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, messageToUserDTO.getId().toString()))
            .body(messageToUserDTO);
    }

    /**
     * {@code PUT  /message-to-users/:id} : Updates an existing messageToUser.
     *
     * @param id the id of the messageToUserDTO to save.
     * @param messageToUserDTO the messageToUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated messageToUserDTO,
     * or with status {@code 400 (Bad Request)} if the messageToUserDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the messageToUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<MessageToUserDTO> updateMessageToUser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MessageToUserDTO messageToUserDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to update MessageToUser : {}, {}", id, messageToUserDTO);
        if (messageToUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, messageToUserDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!messageToUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        messageToUserDTO = messageToUserService.update(messageToUserDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, messageToUserDTO.getId().toString()))
            .body(messageToUserDTO);
    }

    /**
     * {@code PATCH  /message-to-users/:id} : Partial updates given fields of an existing messageToUser, field will ignore if it is null
     *
     * @param id the id of the messageToUserDTO to save.
     * @param messageToUserDTO the messageToUserDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated messageToUserDTO,
     * or with status {@code 400 (Bad Request)} if the messageToUserDTO is not valid,
     * or with status {@code 404 (Not Found)} if the messageToUserDTO is not found,
     * or with status {@code 500 (Internal Server Error)} if the messageToUserDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<MessageToUserDTO> partialUpdateMessageToUser(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody MessageToUserDTO messageToUserDTO
    ) throws URISyntaxException {
        LOG.debug("REST request to partial update MessageToUser partially : {}, {}", id, messageToUserDTO);
        if (messageToUserDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, messageToUserDTO.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!messageToUserRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<MessageToUserDTO> result = messageToUserService.partialUpdate(messageToUserDTO);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, messageToUserDTO.getId().toString())
        );
    }

    /**
     * {@code GET  /message-to-users} : get all the messageToUsers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of messageToUsers in body.
     */
    @GetMapping("")
    public List<MessageToUserDTO> getAllMessageToUsers() {
        LOG.debug("REST request to get all MessageToUsers");
        return messageToUserService.findAll();
    }

    /**
     * {@code GET  /message-to-users/:id} : get the "id" messageToUser.
     *
     * @param id the id of the messageToUserDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the messageToUserDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<MessageToUserDTO> getMessageToUser(@PathVariable("id") Long id) {
        LOG.debug("REST request to get MessageToUser : {}", id);
        Optional<MessageToUserDTO> messageToUserDTO = messageToUserService.findOne(id);
        return ResponseUtil.wrapOrNotFound(messageToUserDTO);
    }

    /**
     * {@code DELETE  /message-to-users/:id} : delete the "id" messageToUser.
     *
     * @param id the id of the messageToUserDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessageToUser(@PathVariable("id") Long id) {
        LOG.debug("REST request to delete MessageToUser : {}", id);
        messageToUserService.delete(id);
        return ResponseEntity.noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
