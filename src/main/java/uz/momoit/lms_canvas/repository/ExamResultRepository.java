package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.ExamResult;

/**
 * Spring Data JPA repository for the ExamResult entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ExamResultRepository extends JpaRepository<ExamResult, Long> {}
