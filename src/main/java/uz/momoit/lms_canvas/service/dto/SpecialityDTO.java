package uz.momoit.lms_canvas.service.dto;

import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Speciality} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class SpecialityDTO implements Serializable {

    private Long id;

    private String name;

    private FacultyDTO faculty;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public FacultyDTO getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultyDTO faculty) {
        this.faculty = faculty;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SpecialityDTO)) {
            return false;
        }

        SpecialityDTO specialityDTO = (SpecialityDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, specialityDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SpecialityDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", faculty=" + getFaculty() +
            "}";
    }
}
