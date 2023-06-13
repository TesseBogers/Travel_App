package becode.javagroup.travelapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.HashSet;
import java.util.Set;

/**
 * A User class to represent the users in the system.
 * This class is annotated with the @Entity annotation, which makes it a JPA entity.
 * It is also annotated with @Data, @Builder, @AllArgsConstructor, @NoArgsConstructor.
 * These annotations are provided by the Lombok library and reduce boilerplate code.
 * @see Entity
 * @see <a href="https://www.baeldung.com/intro-to-project-lombok">Lombok</a>
 * @see <a href="https://www.baeldung.com/jpa-entity-table">Table</a>
 */
@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    /**
     * The id of this user.
     * @see Id
     * @see GeneratedValue
     * @see GenerationType
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    /**
     * The username of this user.
     * @see NaturalId
     * @see NotBlank
     * @see Column
     */
    @NaturalId
    @NotBlank
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    /**
     * The password hash of this user.
     * @see JsonIgnore
     */
    @JsonIgnore
    private String passwordHash;

    /**
     * The email of this user.
     * @see NaturalId
     * @see NotBlank
     * @see Email
     * @see Column
     */
    @NaturalId
    @NotBlank
    @Email
    @Column(name = "email", unique = true)
    private String email;

    /**
     * The roles associated with this user.
     * @see ManyToMany
     * @see JoinTable
     * @see Role
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles = new HashSet<>();

    /**
     * The userProfile associated with this user.
     * @see OneToOne
     * @see JoinColumn
     * @see UserProfile
     */
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private UserProfile userProfile;

    /**
     * Checks if this user has a specific permission.
     * @param permissionName the name of the permission to check
     * @return true if the user has the permission, false otherwise
     */
    public boolean hasPermission(PermissionName permissionName) {
        for (Role role : roles) {
            for (Permission permission : role.getPermissions()) {
                if (permission.getName().equals(permissionName.name())) {
                    return true;
                }
            }
        }
        return false;
    }

    /**
     * Checks if this user has a specific role.
     * @param roleName the name of the role to check
     * @return true if the user has the role, false otherwise
     */
    public boolean hasRole(RoleName roleName) {
        for (Role role : roles) {
            if (role.getName().equals(roleName.name())) {
                return true;
            }
        }
        return false;
    }
}