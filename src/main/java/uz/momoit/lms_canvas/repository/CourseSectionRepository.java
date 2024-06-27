package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.CourseSection;

/**
 * Spring Data JPA repository for the CourseSection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseSectionRepository extends JpaRepository<CourseSection, Long> {}
