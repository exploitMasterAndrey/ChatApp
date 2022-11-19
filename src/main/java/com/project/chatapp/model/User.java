package com.project.chatapp.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.Collection;


@Entity
@Table(name = "usr")
@Getter
@Setter
@NoArgsConstructor
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "This field cannot be empty -_-")
    @Size(min = 3, message = "Nickname must contains at least 3 symbols")
    @Size(max = 20, message = "Nickname must contains less then 20 symbols")
    private String userName;

    @NotBlank(message = "This field cannot be empty -_-")
    @Email(message = "This field should have email format")
    @JsonIgnore
    private String email;

    @NotBlank(message = "This field cannot be empty -_-")
    @Size(min = 5, message = "password must contains more then 5 symbols")
    @JsonIgnore
    private String password;

    @Enumerated(value = EnumType.STRING)
    @Column(name = "role")
    @JsonIgnore
    private Role role;

    @JsonIgnore
    private String image;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
