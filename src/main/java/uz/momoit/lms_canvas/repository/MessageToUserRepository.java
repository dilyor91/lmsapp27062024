package uz.momoit.lms_canvas.repository;

import java.util.List;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.MessageToUser;

/**
 * Spring Data JPA repository for the MessageToUser entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MessageToUserRepository extends JpaRepository<MessageToUser, Long> {
    @Query("select messageToUser from MessageToUser messageToUser where messageToUser.receiver.login = ?#{authentication.name}")
    List<MessageToUser> findByReceiverIsCurrentUser();
}
