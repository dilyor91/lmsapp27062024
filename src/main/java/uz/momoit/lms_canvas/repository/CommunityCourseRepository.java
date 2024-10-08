package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.CommunityCourse;

/**
 * Spring Data JPA repository for the CommunityCourse entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommunityCourseRepository extends JpaRepository<CommunityCourse, Long> {}
