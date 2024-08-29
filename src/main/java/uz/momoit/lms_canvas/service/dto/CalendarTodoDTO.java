package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.CalendarTodo} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CalendarTodoDTO implements Serializable {

    private Long id;

    private String title;

    private Instant date;

    private String time;

    private String details;

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

    public Instant getDate() {
        return date;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
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
        if (!(o instanceof CalendarTodoDTO)) {
            return false;
        }

        CalendarTodoDTO calendarTodoDTO = (CalendarTodoDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, calendarTodoDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CalendarTodoDTO{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", date='" + getDate() + "'" +
            ", time='" + getTime() + "'" +
            ", details='" + getDetails() + "'" +
            ", user=" + getUser() +
            "}";
    }
}
