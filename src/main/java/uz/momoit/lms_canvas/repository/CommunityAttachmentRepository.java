package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.CommunityAttachment;

/**
 * Spring Data JPA repository for the CommunityAttachment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommunityAttachmentRepository extends JpaRepository<CommunityAttachment, Long> {}
