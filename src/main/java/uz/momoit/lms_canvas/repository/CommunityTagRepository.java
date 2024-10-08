package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.CommunityTag;

/**
 * Spring Data JPA repository for the CommunityTag entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommunityTagRepository extends JpaRepository<CommunityTag, Long> {}
