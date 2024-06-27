package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.QuizResult;

/**
 * Spring Data JPA repository for the QuizResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {}
