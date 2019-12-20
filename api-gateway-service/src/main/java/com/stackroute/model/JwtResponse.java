package com.stackroute.model;

import java.io.Serializable;

public class JwtResponse implements Serializable {

    private static final long serialVersionUID = -8091879091924046844L;
    private final String jwttoken;
    private DAOUser daoUser;

    public DAOUser getDaoUser() {
        return daoUser;
    }
    

    public JwtResponse(String jwttoken, DAOUser daoUser) {
        this.jwttoken = jwttoken;
        this.daoUser = daoUser;
    }

    public String getToken() {
        return this.jwttoken;
    }
}
