package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.QuizQuestionGroup;

/**
 * Spring Data JPA repository for the QuizQuestionGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuizQuestionGroupRepository extends JpaRepository<QuizQuestionGroup, Long> {}
