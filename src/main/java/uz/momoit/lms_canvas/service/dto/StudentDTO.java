package uz.momoit.lms_canvas.service.dto;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;
import uz.momoit.lms_canvas.domain.enumeration.EducationForm;
import uz.momoit.lms_canvas.domain.enumeration.EducationLanguage;
import uz.momoit.lms_canvas.domain.enumeration.EducationType;
import uz.momoit.lms_canvas.domain.enumeration.TutionTypeEnum;

/**
 * A DTO for the {@link uz.momoit.lms_canvas.domain.Student} entity.
 */
@SuppressWarnings("common-java:DuplicatedBlocks")
public class StudentDTO implements Serializable {

    private Long id;

    @NotNull
    private String firstName;

    @NotNull
    private String lastName;

    @NotNull
    private String middleName;

    @NotNull
    private String gender;

    @NotNull
    private String birthdate;

    private String phoneNumber;

    @NotNull
    private String email;

    private Long hemisId;

    @NotNull
    private String passportNumber;

    @NotNull
    private String jshshir;

    private Boolean isActive;

    private TutionTypeEnum tutionType;

    private String nationality;

    private String country;

    private String city;

    private String region;

    private String addressLine;

    private Integer course;

    private Integer semester;

    private EducationLanguage educationLanguage;

    private EducationType educationType;

    private EducationForm educationForm;

    private StudyAcademicYearDTO studyAcademicYear;

    private UserDTO user;

    private FacultyDTO faculty;

    private SpecialityDTO speciality;

    private GroupDTO group;

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

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
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

    public Long getHemisId() {
        return hemisId;
    }

    public void setHemisId(Long hemisId) {
        this.hemisId = hemisId;
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

    public TutionTypeEnum getTutionType() {
        return tutionType;
    }

    public void setTutionType(TutionTypeEnum tutionType) {
        this.tutionType = tutionType;
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

    public Integer getCourse() {
        return course;
    }

    public void setCourse(Integer course) {
        this.course = course;
    }

    public Integer getSemester() {
        return semester;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public EducationLanguage getEducationLanguage() {
        return educationLanguage;
    }

    public void setEducationLanguage(EducationLanguage educationLanguage) {
        this.educationLanguage = educationLanguage;
    }

    public EducationType getEducationType() {
        return educationType;
    }

    public void setEducationType(EducationType educationType) {
        this.educationType = educationType;
    }

    public EducationForm getEducationForm() {
        return educationForm;
    }

    public void setEducationForm(EducationForm educationForm) {
        this.educationForm = educationForm;
    }

    public StudyAcademicYearDTO getStudyAcademicYear() {
        return studyAcademicYear;
    }

    public void setStudyAcademicYear(StudyAcademicYearDTO studyAcademicYear) {
        this.studyAcademicYear = studyAcademicYear;
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

    public SpecialityDTO getSpeciality() {
        return speciality;
    }

    public void setSpeciality(SpecialityDTO speciality) {
        this.speciality = speciality;
    }

    public GroupDTO getGroup() {
        return group;
    }

    public void setGroup(GroupDTO group) {
        this.group = group;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof StudentDTO)) {
            return false;
        }

        StudentDTO studentDTO = (StudentDTO) o;
        if (this.id == null) {
            return false;
        }
        return Objects.equals(this.id, studentDTO.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(this.id);
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "StudentDTO{" +
            "id=" + getId() +
            ", firstName='" + getFirstName() + "'" +
            ", lastName='" + getLastName() + "'" +
            ", middleName='" + getMiddleName() + "'" +
            ", gender='" + getGender() + "'" +
            ", birthdate='" + getBirthdate() + "'" +
            ", phoneNumber='" + getPhoneNumber() + "'" +
            ", email='" + getEmail() + "'" +
            ", hemisId=" + getHemisId() +
            ", passportNumber='" + getPassportNumber() + "'" +
            ", jshshir='" + getJshshir() + "'" +
            ", isActive='" + getIsActive() + "'" +
            ", tutionType='" + getTutionType() + "'" +
            ", nationality='" + getNationality() + "'" +
            ", country='" + getCountry() + "'" +
            ", city='" + getCity() + "'" +
            ", region='" + getRegion() + "'" +
            ", addressLine='" + getAddressLine() + "'" +
            ", course=" + getCourse() +
            ", semester=" + getSemester() +
            ", educationLanguage='" + getEducationLanguage() + "'" +
            ", educationType='" + getEducationType() + "'" +
            ", educationForm='" + getEducationForm() + "'" +
            ", studyAcademicYear=" + getStudyAcademicYear() +
            ", user=" + getUser() +
            ", faculty=" + getFaculty() +
            ", speciality=" + getSpeciality() +
            ", group=" + getGroup() +
            "}";
    }
}
