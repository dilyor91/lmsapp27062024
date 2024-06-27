package uz.momoit.lms_canvas.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import uz.momoit.lms_canvas.domain.Assignment;

public interface AssignmentRepositoryWithBagRelationships {
    Optional<Assignment> fetchBagRelationships(Optional<Assignment> assignment);

    List<Assignment> fetchBagRelationships(List<Assignment> assignments);

    Page<Assignment> fetchBagRelationships(Page<Assignment> assignments);
}
