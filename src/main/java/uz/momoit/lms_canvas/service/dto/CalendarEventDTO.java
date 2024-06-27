package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.EventFrequency;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.CalendarEvent} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CalendarEventDTO implements Serializable {

    private Long id;

    private String title;

    private String content;

    private Instant date;

    private Integer startTime;

    private Integer endTime;

    private String location;

    private String address;

    private EventFrequency eventFrequency;

    private UserDTO user;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Integer getStartTime() {
        return startTime;
    }

    public void setStartTime(Integer startTime) {
        this.startTime = startTime;
    }

    public Integer getEndTime() {
        return endTime;
    }

    public void setEndTime(Integer endTime) {
        this.endTime = endTime;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public EventFrequency getEventFrequency() {
        return eventFrequency;
    }

    public void setEventFrequency(EventFrequency eventFrequency) {
        this.eventFrequency = eventFrequency;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CalendarEventDTO)) {
            return false;
        }

        CalendarEventDTO calendarEventDTO = (CalendarEventDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, calendarEventDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CalendarEventDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", date='" + getDate() + "'" +
            ", startTime=" + getStartTime() +
            ", endTime=" + getEndTime() +
            ", location='" + getLocation() + "'" +
            ", address='" + getAddress() + "'" +
            ", eventFrequency='" + getEventFrequency() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
