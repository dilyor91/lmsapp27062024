package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.StudentOption;

/**
 * Spring Data JPA repository for the StudentOption entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudentOptionRepository extends JpaRepository<StudentOption, Long> {}
