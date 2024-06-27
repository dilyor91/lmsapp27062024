package uz.momoit.lms_canvas.repository;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;
import uz.momoit.lms_canvas.domain.Accounts;

/**
 * Spring Data JPA repository for the Accounts entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountsRepository extends JpaRepository<Accounts, Long> {}
