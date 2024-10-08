package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.AnnouncementStudentRead;

/**
 * Spring Data JPA repository for the AnnouncementStudentRead entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnouncementStudentReadRepository extends JpaRepository<AnnouncementStudentRead, Long> {}
