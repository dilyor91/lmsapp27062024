package uz.momoit.lms_canvas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.CommunityMessage;

/**
 * Spring Data JPA repository for the CommunityMessage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommunityMessageRepository extends JpaRepository<CommunityMessage, Long> {
    @Query("select communityMessage from CommunityMessage communityMessage where communityMessage.sender.login = ?#{authentication.name}")
    List<CommunityMessage> findBySenderIsCurrentUser();
}
