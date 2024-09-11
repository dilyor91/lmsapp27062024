package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.Building;

/**
 * Spring Data JPA repository for the Building entity.
 */
@SuppressWarnings("unused")
@Repository
public interface BuildingRepository extends JpaRepository<Building, Long> {}
