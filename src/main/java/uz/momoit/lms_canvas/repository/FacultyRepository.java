package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.Faculty;

/**
 * Spring Data JPA repository for the Faculty entity.
 */
@SuppressWarnings("unused")
@Repository
public interface FacultyRepository extends JpaRepository<Faculty, Long> {}
