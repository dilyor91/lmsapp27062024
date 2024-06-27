package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.StudyAcademicYear;

/**
 * Spring Data JPA repository for the StudyAcademicYear entity.
 */
@SuppressWarnings("unused")
@Repository
public interface StudyAcademicYearRepository extends JpaRepository<StudyAcademicYear, Long> {}
