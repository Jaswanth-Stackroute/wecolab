package com.stackroute.services;

import org.passay.CharacterData;
import org.passay.CharacterRule;
import org.passay.EnglishCharacterData;
import org.passay.PasswordGenerator;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
@Service
public class UserService {
    public String generateRandomPassword(int length) {

        List rules = Arrays.asList(new CharacterRule(EnglishCharacterData.UpperCase, 1),
                new CharacterRule(EnglishCharacterData.LowerCase, 1), new CharacterRule(EnglishCharacterData.Digit, 1),new CharacterRule(new CharacterData() {
                    @Override
                    public String getErrorCode() {
                        return "INSUFFICIENT_SPECIAL";
                    }

                    @Override
                    public String getCharacters() {
                        return new String(new char[]{'@','#','$','&','*','!','%'});
                    }
                }, 1));

        PasswordGenerator generator = new PasswordGenerator();
        String password = generator.generatePassword(length, rules);
        return password;
    }
}
