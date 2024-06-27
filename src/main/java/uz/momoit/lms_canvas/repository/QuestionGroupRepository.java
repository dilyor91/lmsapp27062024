package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.QuestionGroup;

/**
 * Spring Data JPA repository for the QuestionGroup entity.
 */
@SuppressWarnings("unused")
@Repository
public interface QuestionGroupRepository extends JpaRepository<QuestionGroup, Long> {}
