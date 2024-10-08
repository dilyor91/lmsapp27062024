package uz.momoit.lms_canvas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.Community;

/**
 * Spring Data JPA repository for the Community entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    @Query("select community from Community community where community.user.login = ?#{authentication.name}")
    List<Community> findByUserIsCurrentUser();
}
