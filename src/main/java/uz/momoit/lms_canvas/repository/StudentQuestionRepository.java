package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.StudentQuestion;

/**
 * Spring Data JPA repository for the StudentQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentQuestionRepository extends JpaRepository<StudentQuestion, Long> {}
