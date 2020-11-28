package tech.jhipster.sample.security;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Optional;
import org.junit.jupiter.api.Test;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

/**
 * Test class for the {@link SecurityUtils} utility class.
 */
public class SecurityUtilsUnitTest {

	@Test
	public void testGetCurrentUserLogin() {
		SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
		securityContext.setAuthentication(
			new UsernamePasswordAuthenticationToken("admin", "admin")
		);
		SecurityContextHolder.setContext(securityContext);
		Optional<String> login = SecurityUtils.getCurrentUserLogin();
		assertThat(login).contains("admin");
	}

	@Test
	public void testIsAuthenticated() {
		SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
		securityContext.setAuthentication(
			new UsernamePasswordAuthenticationToken("admin", "admin")
		);
		SecurityContextHolder.setContext(securityContext);
		boolean isAuthenticated = SecurityUtils.isAuthenticated();
		assertThat(isAuthenticated).isTrue();
	}

	@Test
	public void testAnonymousIsNotAuthenticated() {
		SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(
			new SimpleGrantedAuthority(AuthoritiesConstants.ANONYMOUS)
		);
		securityContext.setAuthentication(
			new UsernamePasswordAuthenticationToken(
				"anonymous",
				"anonymous",
				authorities
			)
		);
		SecurityContextHolder.setContext(securityContext);
		boolean isAuthenticated = SecurityUtils.isAuthenticated();
		assertThat(isAuthenticated).isFalse();
	}

	@Test
	public void testIsCurrentUserInRole() {
		SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(AuthoritiesConstants.USER));
		securityContext.setAuthentication(
			new UsernamePasswordAuthenticationToken("user", "user", authorities)
		);
		SecurityContextHolder.setContext(securityContext);

		assertThat(SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.USER))
			.isTrue();
		assertThat(
			SecurityUtils.isCurrentUserInRole(AuthoritiesConstants.ADMIN)
		)
			.isFalse();
	}
}
