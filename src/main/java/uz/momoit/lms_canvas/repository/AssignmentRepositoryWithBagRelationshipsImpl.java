package uz.momoit.lms_canvas.repository;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import uz.momoit.lms_canvas.domain.Assignment;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class AssignmentRepositoryWithBagRelationshipsImpl implements AssignmentRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String ASSIGNMENTS_PARAMETER = "assignments";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Assignment> fetchBagRelationships(Optional<Assignment> assignment) {
        return assignment.map(this::fetchCourseSections);
    }

    @Override
    public Page<Assignment> fetchBagRelationships(Page<Assignment> assignments) {
        return new PageImpl<>(fetchBagRelationships(assignments.getContent()), assignments.getPageable(), assignments.getTotalElements());
    }

    @Override
    public List<Assignment> fetchBagRelationships(List<Assignment> assignments) {
        return Optional.of(assignments).map(this::fetchCourseSections).orElse(Collections.emptyList());
    }

    Assignment fetchCourseSections(Assignment result) {
        return entityManager
            .createQuery(
                "select assignment from Assignment assignment left join fetch assignment.courseSections where assignment.id = :id",
                Assignment.class
            )
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Assignment> fetchCourseSections(List<Assignment> assignments) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, assignments.size()).forEach(index -> order.put(assignments.get(index).getId(), index));
        List<Assignment> result = entityManager
            .createQuery(
                "select assignment from Assignment assignment left join fetch assignment.courseSections where assignment in :assignments",
                Assignment.class
            )
            .setParameter(ASSIGNMENTS_PARAMETER, assignments)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
