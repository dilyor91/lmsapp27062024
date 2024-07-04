package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.CourseWeek;

/**
 * Spring Data JPA repository for the CourseWeek entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseWeekRepository extends JpaRepository<CourseWeek, Long> {}
