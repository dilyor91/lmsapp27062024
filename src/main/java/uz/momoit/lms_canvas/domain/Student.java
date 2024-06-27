package uz.momoit.lms_canvas.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import uz.momoit.lms_canvas.domain.enumeration.EducationForm;
import uz.momoit.lms_canvas.domain.enumeration.EducationLanguage;
import uz.momoit.lms_canvas.domain.enumeration.EducationType;
import uz.momoit.lms_canvas.domain.enumeration.TutionTypeEnum;

/**
 * A Student.
 */
@Entity
@Table(name = "student")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Student implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @NotNull
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @NotNull
    @Column(name = "middle_name", nullable = false)
    private String middleName;

    @NotNull
    @Column(name = "gender", nullable = false)
    private String gender;

    @NotNull
    @Column(name = "birthdate", nullable = false)
    private String birthdate;

    @Column(name = "phone_number")
    private String phoneNumber;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "hemis_id")
    private Long hemisId;

    @NotNull
    @Column(name = "passport_number", nullable = false)
    private String passportNumber;

    @NotNull
    @Column(name = "jshshir", nullable = false)
    private String jshshir;

    @Column(name = "is_active")
    private Boolean isActive;

    @Enumerated(EnumType.STRING)
    @Column(name = "tution_type")
    private TutionTypeEnum tutionType;

    @Column(name = "nationality")
    private String nationality;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "region")
    private String region;

    @Column(name = "address_line")
    private String addressLine;

    @Column(name = "course")
    private Integer course;

    @Column(name = "semester")
    private Integer semester;

    @Enumerated(EnumType.STRING)
    @Column(name = "education_language")
    private EducationLanguage educationLanguage;

    @Enumerated(EnumType.STRING)
    @Column(name = "education_type")
    private EducationType educationType;

    @Enumerated(EnumType.STRING)
    @Column(name = "education_form")
    private EducationForm educationForm;

    @JsonIgnoreProperties(value = { "student" }, allowSetters = true)
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(unique = true)
    private StudyAcademicYear studyAcademicYear;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    private Faculty faculty;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "faculty" }, allowSetters = true)
    private Speciality speciality;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "speciality" }, allowSetters = true)
    private Group group;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Student id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirstName() {
        return this.firstName;
    }

    public Student firstName(String firstName) {
        this.setFirstName(firstName);
        return this;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return this.lastName;
    }

    public Student lastName(String lastName) {
        this.setLastName(lastName);
        return this;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getMiddleName() {
        return this.middleName;
    }

    public Student middleName(String middleName) {
        this.setMiddleName(middleName);
        return this;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getGender() {
        return this.gender;
    }

    public Student gender(String gender) {
        this.setGender(gender);
        return this;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthdate() {
        return this.birthdate;
    }

    public Student birthdate(String birthdate) {
        this.setBirthdate(birthdate);
        return this;
    }

    public void setBirthdate(String birthdate) {
        this.birthdate = birthdate;
    }

    public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public Student phoneNumber(String phoneNumber) {
        this.setPhoneNumber(phoneNumber);
        return this;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getEmail() {
        return this.email;
    }

    public Student email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getHemisId() {
        return this.hemisId;
    }

    public Student hemisId(Long hemisId) {
        this.setHemisId(hemisId);
        return this;
    }

    public void setHemisId(Long hemisId) {
        this.hemisId = hemisId;
    }

    public String getPassportNumber() {
        return this.passportNumber;
    }

    public Student passportNumber(String passportNumber) {
        this.setPassportNumber(passportNumber);
        return this;
    }

    public void setPassportNumber(String passportNumber) {
        this.passportNumber = passportNumber;
    }

    public String getJshshir() {
        return this.jshshir;
    }

    public Student jshshir(String jshshir) {
        this.setJshshir(jshshir);
        return this;
    }

    public void setJshshir(String jshshir) {
        this.jshshir = jshshir;
    }

    public Boolean getIsActive() {
        return this.isActive;
    }

    public Student isActive(Boolean isActive) {
        this.setIsActive(isActive);
        return this;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public TutionTypeEnum getTutionType() {
        return this.tutionType;
    }

    public Student tutionType(TutionTypeEnum tutionType) {
        this.setTutionType(tutionType);
        return this;
    }

    public void setTutionType(TutionTypeEnum tutionType) {
        this.tutionType = tutionType;
    }

    public String getNationality() {
        return this.nationality;
    }

    public Student nationality(String nationality) {
        this.setNationality(nationality);
        return this;
    }

    public void setNationality(String nationality) {
        this.nationality = nationality;
    }

    public String getCountry() {
        return this.country;
    }

    public Student country(String country) {
        this.setCountry(country);
        return this;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return this.city;
    }

    public Student city(String city) {
        this.setCity(city);
        return this;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return this.region;
    }

    public Student region(String region) {
        this.setRegion(region);
        return this;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public String getAddressLine() {
        return this.addressLine;
    }

    public Student addressLine(String addressLine) {
        this.setAddressLine(addressLine);
        return this;
    }

    public void setAddressLine(String addressLine) {
        this.addressLine = addressLine;
    }

    public Integer getCourse() {
        return this.course;
    }

    public Student course(Integer course) {
        this.setCourse(course);
        return this;
    }

    public void setCourse(Integer course) {
        this.course = course;
    }

    public Integer getSemester() {
        return this.semester;
    }

    public Student semester(Integer semester) {
        this.setSemester(semester);
        return this;
    }

    public void setSemester(Integer semester) {
        this.semester = semester;
    }

    public EducationLanguage getEducationLanguage() {
        return this.educationLanguage;
    }

    public Student educationLanguage(EducationLanguage educationLanguage) {
        this.setEducationLanguage(educationLanguage);
        return this;
    }

    public void setEducationLanguage(EducationLanguage educationLanguage) {
        this.educationLanguage = educationLanguage;
    }

    public EducationType getEducationType() {
        return this.educationType;
    }

    public Student educationType(EducationType educationType) {
        this.setEducationType(educationType);
        return this;
    }

    public void setEducationType(EducationType educationType) {
        this.educationType = educationType;
    }

    public EducationForm getEducationForm() {
        return this.educationForm;
    }

    public Student educationForm(EducationForm educationForm) {
        this.setEducationForm(educationForm);
        return this;
    }

    public void setEducationForm(EducationForm educationForm) {
        this.educationForm = educationForm;
    }

    public StudyAcademicYear getStudyAcademicYear() {
        return this.studyAcademicYear;
    }

    public void setStudyAcademicYear(StudyAcademicYear studyAcademicYear) {
        this.studyAcademicYear = studyAcademicYear;
    }

    public Student studyAcademicYear(StudyAcademicYear studyAcademicYear) {
        this.setStudyAcademicYear(studyAcademicYear);
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Student user(User user) {
        this.setUser(user);
        return this;
    }

    public Faculty getFaculty() {
        return this.faculty;
    }

    public void setFaculty(Faculty faculty) {
        this.faculty = faculty;
    }

    public Student faculty(Faculty faculty) {
        this.setFaculty(faculty);
        return this;
    }

    public Speciality getSpeciality() {
        return this.speciality;
    }

    public void setSpeciality(Speciality speciality) {
        this.speciality = speciality;
    }

    public Student speciality(Speciality speciality) {
        this.setSpeciality(speciality);
        return this;
    }

    public Group getGroup() {
        return this.group;
    }

    public void setGroup(Group group) {
        this.group = group;
    }

    public Student group(Group group) {
        this.setGroup(group);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Student)) {
            return false;
        }
        return getId() != null && getId().equals(((Student) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Student{" +
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
            "}";
    }
}
