package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.AssignmentCourseSection;

/**
 * Spring Data JPA repository for the AssignmentCourseSection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AssignmentCourseSectionRepository extends JpaRepository<AssignmentCourseSection, Long> {}
