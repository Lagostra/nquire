package nquire;

import grails.plugin.springsecurity.userdetails.GrailsUser;
import org.springframework.security.core.GrantedAuthority;

class MyUserDetails extends GrailsUser {

    final String fullName;
    String lectureToken
    int currentLecture
    public MyUserDetails(String username, String password, boolean enabled, boolean accountNonExpired,
                  boolean credentialsNonExpired, boolean accountNonLocked, Collection<GrantedAuthority> authorities,
                  long id, String fullName, int currentLecture, String lectureToken) {
        super(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities, id);

        this.fullName = fullName
        this.currentLecture = currentLecture
        this.lectureToken = lectureToken
    }

}