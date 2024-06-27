package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.WikiPage;

/**
 * Spring Data JPA repository for the WikiPage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface WikiPageRepository extends JpaRepository<WikiPage, Long> {}
