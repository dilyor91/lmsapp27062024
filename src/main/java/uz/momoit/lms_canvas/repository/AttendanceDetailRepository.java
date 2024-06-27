package uz.momoit.lms_canvas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.AttendanceDetail;

/**
 * Spring Data JPA repository for the AttendanceDetail entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AttendanceDetailRepository extends JpaRepository<AttendanceDetail, Long> {
    @Query("select attendanceDetail from AttendanceDetail attendanceDetail where attendanceDetail.student.login = ?#{authentication.name}")
    List<AttendanceDetail> findByStudentIsCurrentUser();
}
