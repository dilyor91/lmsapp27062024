package uz.momoit.lms_canvas.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import uz.momoit.lms_canvas.domain.Announcement;

public interface AnnouncementRepositoryWithBagRelationships {
    Optional<Announcement> fetchBagRelationships(Optional<Announcement> announcement);

    List<Announcement> fetchBagRelationships(List<Announcement> announcements);

    Page<Announcement> fetchBagRelationships(Page<Announcement> announcements);
}
