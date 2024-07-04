package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.CourseWeekInfo;

/**
 * Spring Data JPA repository for the CourseWeekInfo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CourseWeekInfoRepository extends JpaRepository<CourseWeekInfo, Long> {}
