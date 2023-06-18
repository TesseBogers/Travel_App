package becode.javagroup.travelapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    @NaturalId
    @NotBlank
    @Column(name = "username", unique = true, nullable = false)
    private String username;

    @JsonIgnore
    private String passwordHash;

    @Column(name = "salt")
    private String salt;

    @NotBlank
    @Email
    @Column(name = "email", unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @JsonManagedReference
    private Set<Role> roles = new HashSet<>();

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_profile_id", referencedColumnName = "id")
    @JsonManagedReference
    private UserProfile userProfile;

    public boolean hasPermission(PermissionName permissionName) {
        for (Role role : roles) {
            for (Permission permission : role.getPermissions()) {
                if (permission.getPermissionName().equals(permissionName.getValue())) {
                    return true;
                }
            }
        }
        return false;
    }

    public boolean hasRole(String roleName) {
            for (Role role : roles) {
                if (role.getRoleName().equals(roleName)) {
                    return true;
                }
            }
            return false;
        }
    }