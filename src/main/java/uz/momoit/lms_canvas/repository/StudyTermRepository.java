package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.StudyTerm;

/**
 * Spring Data JPA repository for the StudyTerm entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudyTermRepository extends JpaRepository<StudyTerm, Long> {}
