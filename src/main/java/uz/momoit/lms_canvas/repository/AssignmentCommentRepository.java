package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.AssignmentComment;

/**
 * Spring Data JPA repository for the AssignmentComment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssignmentCommentRepository extends JpaRepository<AssignmentComment, Long> {}
