package com.stackroute.repository;

import com.stackroute.model.DAOUser;
import com.stackroute.model.UserBasicInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<DAOUser,String> {
    DAOUser findByEmailIdIgnoreCase(String emailId);
    DAOUser findByEmailId(String emailId);
    List<DAOUser> findByRole(String role);

    @Query("SELECT u FROM DAOUser u WHERE u.company.id = ?1")
    List<DAOUser> findAllUserById(int id);

    @Modifying
    @Transactional
    @Query("DELETE FROM ConfirmationToken t where t.DAOUser.userId=?1")
    public void deleteConfirmationTokenByUserId(long userId);

    @Modifying
    @Transactional
    @Query("DELETE FROM DAOUser u WHERE u.userId=?1")
    public void deleteUserById(long userId);

}
