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
import uz.momoit.lms_canvas.domain.Announcement;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class AnnouncementRepositoryWithBagRelationshipsImpl implements AnnouncementRepositoryWithBagRelationships {

    private static final String ID_PARAMETER = "id";
    private static final String ANNOUNCEMENTS_PARAMETER = "announcements";

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Announcement> fetchBagRelationships(Optional<Announcement> announcement) {
        return announcement.map(this::fetchCourseSections);
    }

    @Override
    public Page<Announcement> fetchBagRelationships(Page<Announcement> announcements) {
        return new PageImpl<>(
            fetchBagRelationships(announcements.getContent()),
            announcements.getPageable(),
            announcements.getTotalElements()
        );
    }

    @Override
    public List<Announcement> fetchBagRelationships(List<Announcement> announcements) {
        return Optional.of(announcements).map(this::fetchCourseSections).orElse(Collections.emptyList());
    }

    Announcement fetchCourseSections(Announcement result) {
        return entityManager
            .createQuery(
                "select announcement from Announcement announcement left join fetch announcement.courseSections where announcement.id = :id",
                Announcement.class
            )
            .setParameter(ID_PARAMETER, result.getId())
            .getSingleResult();
    }

    List<Announcement> fetchCourseSections(List<Announcement> announcements) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, announcements.size()).forEach(index -> order.put(announcements.get(index).getId(), index));
        List<Announcement> result = entityManager
            .createQuery(
                "select announcement from Announcement announcement left join fetch announcement.courseSections where announcement in :announcements",
                Announcement.class
            )
            .setParameter(ANNOUNCEMENTS_PARAMETER, announcements)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
