package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.QuizCourseSection;

/**
 * Spring Data JPA repository for the QuizCourseSection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizCourseSectionRepository extends JpaRepository<QuizCourseSection, Long> {}
