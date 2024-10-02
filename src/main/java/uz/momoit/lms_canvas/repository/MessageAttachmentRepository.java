package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.MessageAttachment;

/**
 * Spring Data JPA repository for the MessageAttachment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageAttachmentRepository extends JpaRepository<MessageAttachment, Long> {}
