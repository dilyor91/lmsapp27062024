package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.StudentAnswerQuestion;

/**
 * Spring Data JPA repository for the StudentAnswerQuestion entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentAnswerQuestionRepository extends JpaRepository<StudentAnswerQuestion, Long> {}
