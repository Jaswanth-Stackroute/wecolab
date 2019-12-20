package com.stackroute.services;

import com.stackroute.model.DAOUser;
import com.stackroute.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        DAOUser user=userRepository.findByEmailIdIgnoreCase(username);
        System.out.println(username);
        if (user!=null) {
            return new User(user.getEmailId(), user.getPassword(),
                    getAuthority(user));
        } else {
            throw new UsernameNotFoundException("DAOUser not found with username: " + username);
        }
    }

    private List getAuthority(DAOUser user) {
        List authorities = new ArrayList<String>();
        authorities.add(new SimpleGrantedAuthority("ROLE_" + user.getRole()));
        return authorities;
    }
}