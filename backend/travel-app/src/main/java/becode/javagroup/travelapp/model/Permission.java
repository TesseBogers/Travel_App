package becode.javagroup.travelapp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
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
     * The name of this permission as a PermissionName enum.
     * @see Enumerated
     * @see Column
     * @see PermissionName
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "permission_name")
    private PermissionName permissionName;

    /**
     * The name of this permission.
     * @see NotBlank
     */
    @NotBlank
    private String name;

    /**
     * The roles associated with this permission.
     * @see ManyToMany
     * @see Role
     */
    @ManyToMany(mappedBy = "permissions")
    private Set<Role> roles;
}