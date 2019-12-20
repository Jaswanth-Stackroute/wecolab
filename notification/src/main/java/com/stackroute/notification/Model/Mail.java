package com.stackroute.notification.Model;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Mail {

    private String from;
    private String subject;
    private Map<String, Object> model;
    private String template;
    private List<String> emails;

    public String getFrom() {
        return from;
    }

    public void setFrom(String from) {
        this.from = from;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Map<String, Object> getModel() {
        return model;
    }

    public void setModel(Map<String, Object> model) {
        this.model = model;
    }

    public String getTemplate() {
        return template;
    }

    public void setTemplate(String template) {
        this.template = template;
    }

    public ArrayList getEmails() {
        return (ArrayList) emails;
    }

    public void setEmails(List<String> emails) {
        this.emails = emails;
    }

    public Mail() {
    }

}