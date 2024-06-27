package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.AcademicDegreeEnum;
import uz.momoit.lms_canvas.domain.enumeration.AcademicTitleEnum;
import uz.momoit.lms_canvas.domain.enumeration.GenderEnum;
import uz.momoit.lms_canvas.domain.enumeration.PositionEnum;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Teacher} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class TeacherDTO implements Serializable {

    private Long id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    private String middleName;

    @NotNull
    private GenderEnum gender;

    @NotNull
    private String birthdate;

    private String phoneNumber;

    @NotNull
    private String email;

    @NotNull
    private String passportNumber;

    @NotNull
    private String jshshir;

    private Boolean isActive;

    private String nationality;

    private String country;

    private String city;

    private String region;

    private String addressLine;

    private PositionEnum position;

    private AcademicDegreeEnum academicDegree;

    private AcademicTitleEnum academicTitle;

    private UserDTO user;

    private FacultyDTO faculty;

    private DepartmentDTO department;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public GenderEnum getGender() {
        return gender;
    }

    public void setGender(GenderEnum gender) {
        this.gender = gender;
    }

    public String getBirthdate() {
        return birthdate;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassportNumber() {
        return passportNumber;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getJshshir() {
        return jshshir;
    }

    public void setJshshir(String jshshir) {
        this.jshshir = jshshir;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public String getNationality() {
        return nationality;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getAddressLine() {
        return addressLine;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public PositionEnum getPosition() {
        return position;
    }

    public void setPosition(PositionEnum position) {
        this.position = position;
    }

    public AcademicDegreeEnum getAcademicDegree() {
        return academicDegree;
    }

    public void setAcademicDegree(AcademicDegreeEnum academicDegree) {
        this.academicDegree = academicDegree;
    }

    public AcademicTitleEnum getAcademicTitle() {
        return academicTitle;
    }

    public void setAcademicTitle(AcademicTitleEnum academicTitle) {
        this.academicTitle = academicTitle;
    }

    public UserDTO getUser() {
        return user;
    }

    public void setUser(UserDTO user) {
        this.user = user;
    }

    public FacultyDTO getFaculty() {
        return faculty;
    }

    public void setFaculty(FacultyDTO faculty) {
        this.faculty = faculty;
    }

    public DepartmentDTO getDepartment() {
        return department;
    }

    public void setDepartment(DepartmentDTO department) {
        this.department = department;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof TeacherDTO)) {
            return false;
        }

        TeacherDTO teacherDTO = (TeacherDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, teacherDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "TeacherDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", gender='" + getGender() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", passportNumber='" + getPassportNumber() + "'" +
            ", jshshir='" + getJshshir() + "'" +
            ", isActive='" + getIsActive() + "'" +
            ", nationality='" + getNationality() + "'" +
            ", country='" + getCountry() + "'" +
            ", city='" + getCity() + "'" +
            ", region='" + getRegion() + "'" +
            ", addressLine='" + getAddressLine() + "'" +
            ", position='" + getPosition() + "'" +
            ", academicDegree='" + getAcademicDegree() + "'" +
            ", academicTitle='" + getAcademicTitle() + "'" +
            ", user=" + getUser() +
            ", faculty=" + getFaculty() +
            ", department=" + getDepartment() +
            "}";
    }
}
