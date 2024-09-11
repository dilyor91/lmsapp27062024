package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Building} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class BuildingDTO implements Serializable {

    private Long id;

    @NotNull
    private String name;

    private String description;

    private String address;

    private Boolean status;

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
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
        if (!(o instanceof BuildingDTO)) {
            return false;
        }

        BuildingDTO buildingDTO = (BuildingDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, buildingDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "BuildingDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", address='" + getAddress() + "'" +
            ", status='" + getStatus() + "'" +
            ", faculty=" + getFaculty() +
            "}";
    }
}
