package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.SubmissionAssignment;

/**
 * Spring Data JPA repository for the SubmissionAssignment entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SubmissionAssignmentRepository extends JpaRepository<SubmissionAssignment, Long> {}
