package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.Speciality;

/**
 * Spring Data JPA repository for the Speciality entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SpecialityRepository extends JpaRepository<Speciality, Long> {}
