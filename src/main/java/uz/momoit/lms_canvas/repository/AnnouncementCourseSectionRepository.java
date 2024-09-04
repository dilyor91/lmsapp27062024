package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.AnnouncementCourseSection;

/**
 * Spring Data JPA repository for the AnnouncementCourseSection entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AnnouncementCourseSectionRepository extends JpaRepository<AnnouncementCourseSection, Long> {}
