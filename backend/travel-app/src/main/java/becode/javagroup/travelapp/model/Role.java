package becode.javagroup.travelapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.Set;

/**
 * A Role class to represent the roles of a user in the system.
 * This class is annotated with the @Entity annotation, which makes it a JPA entity.
 * It is also annotated with @Data, @EqualsAndHashCode and @ToString.
 * These annotations are provided by the Lombok library and reduce boilerplate code.
 * The @EqualsAndHashCode and @ToString are also lombok annotations to exclude the users and permissions fields to prevent circular references.
 * @see Entity
 * @see <a href="https://www.baeldung.com/intro-to-project-lombok">Lombok</a>
 * @see EqualsAndHashCode & <a href="https://projectlombok.org/features/EqualsAndHashCode">EqualsAndHashCode</a>
 * @see ToString & <a href="https://projectlombok.org/features/ToString">ToString</a>
 * @see <a href="https://www.baeldung.com/jpa-entity-table">Table</a>
 * @see <a href="https://www.baeldung.com/jackson-bidirectional-relationships-and-infinite-recursion">circular references</a>
 */
@Entity
@Data
@EqualsAndHashCode(exclude = {"users", "permissions"})
@ToString(exclude = {"users", "permissions"})
@Table(name = "roles")
public class Role {

    /**
     * The id of this role.
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
     * The name of this role.
     * @see NotBlank
     * @see Column
     */
    @NotBlank
    @Column(name = "name", unique = true)
    private String name;

    /**
     * The name of this role as a RoleName enum.
     * @see Enumerated
     * @see Column
     * @see RoleName
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private RoleName roleName;

    /**
     * The users associated with this role.
     * @see ManyToMany
     * @see User
     */
    @ManyToMany(mappedBy = "roles")
    private Set<User> users;

    /**
     * The permissions associated with this role.
     * @see ManyToMany
     * @see JoinTable
     * @see JoinColumn
     * @see Permission
     */
    @ManyToMany
    @JoinTable(
            name = "role_permissions",
            joinColumns = @JoinColumn(name = "role_id"),
            inverseJoinColumns = @JoinColumn(name = "permission_id")
    )
    private Set<Permission> permissions;
}