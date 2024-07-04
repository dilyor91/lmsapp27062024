package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.LessonMaterial;

/**
 * Spring Data JPA repository for the LessonMaterial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface LessonMaterialRepository extends JpaRepository<LessonMaterial, Long> {}
