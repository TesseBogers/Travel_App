package becode.javagroup.travelapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

/**
 * A Permission class to represent the permissions of a user in the system.
 * This class is annotated with the @Entity annotation, which makes it a JPA entity.
 * It is also annotated with @Data, @Builder, @AllArgsConstructor, @NoArgsConstructor, @EqualsAndHashCode and @ToString.
 * These annotations are provided by the Lombok library and reduce boilerplate code.
 * The @EqualsAndHashCode and @ToString are also lombok annotations to exclude the roles field to prevent circular references.
 * @see Entity
 * @see <a href="https://www.baeldung.com/intro-to-project-lombok">Lombok</a>
 * @see EqualsAndHashCode & <a href="https://projectlombok.org/features/EqualsAndHashCode">EqualsAndHashCode</a>
 * @see ToString & <a href="https://projectlombok.org/features/ToString">ToString</a>
 * @see <a href="https://www.baeldung.com/jpa-entity-table">Table</a>
 * @see <a href="https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion">circular references</a>
 */
@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(exclude = {"roles"})
@ToString(exclude = {"roles"})
@Table(name = "permissions")
public class Permission {

    /**
     * The id of this permission.
     * @see Id
     * @see GeneratedValue
     * @see GenerationType
     * @see Setter
     * @see AccessLevel
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter(AccessLevel.NONE)
    private Long id;

    /**
     * The name of this permission as a PermissionName string.
     * @see Column
     * @see PermissionName
     */
    @Column(name = "permission_name")
    @NotNull
    private String permissionName;

    /**
     * The roles associated with this permission.
     * @see ManyToMany
     * @see Role
     */
    @ManyToMany(mappedBy = "permissions", fetch = FetchType.LAZY)
    private Set<Role> roles;

    public void addRole(Role role) {
        this.roles.add(role);
        role.getPermissions().add(this);
    }

    public void removeRole(Role role) {
        this.roles.remove(role);
        role.getPermissions().remove(this);
    }
}