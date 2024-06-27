package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.QuizSession;

/**
 * Spring Data JPA repository for the QuizSession entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizSessionRepository extends JpaRepository<QuizSession, Long> {}
