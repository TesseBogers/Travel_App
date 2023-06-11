package becode.javagroup.travelapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.hibernate.annotations.NaturalId;

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

    @NaturalId
    @NotBlank
    @Email
    @Column(name = "email", unique = true)
    private String email;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    private Set<Role> roles;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "profile_id", referencedColumnName = "id")
    private Profile profile;

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


    public boolean hasRole(RoleName roleName) {
        for (Role role : roles) {
            for (Permission permission : role.getPermissions()) {
                if (role.getName().equals(roleName.name())) {
                    return true;
                }
            }
        }
        return false;
    }
}