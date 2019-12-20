# Spring Boot Application Template/chat-service

Built with:-

* 	[Maven](https://maven.apache.org/) - Dependency Management
* 	[JDK](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) - Java™ Platform, Standard Edition Development Kit 
* 	[Spring Boot](https://spring.io/projects/spring-boot) - Framework to ease the bootstrapping and development of new Spring Applications
* 	[Lombok](https://projectlombok.org/) - Never write another getter or equals method again, with one annotation your class has a fully featured builder, Automate your logging variables, and much more.
* 	[Swagger](https://swagger.io/) - Open-Source software framework backed by a large ecosystem of tools that helps developers design, build, document, and consume RESTful Web services.
    
## External Tools Used

* [Postman](https://www.getpostman.com/) - API Development Environment (Testing Docmentation)


We can use the [Spring Boot Maven plugin](https://docs.spring.io/spring-boot/docs/current/reference/html/build-tool-plugins-maven-plugin.html) like so:

    mvn spring-boot:run
    
### URLs

|  URL |  Method | Remarks |
|----------|--------------|--------------|
|`http://localhost:8086/ws/login`                           | MessageMapping | returns groups,messages and files after user logins|
|`http://localhost:8086/ws/chat.sendMessage/fromId/toId`                       | MessageMapping |  Send message from user1 to user2|
|`http://localhost:8086/ws/chat.sendGroupMessage/groupId`                 | MessageMapping | Send group message|
|`http://localhost:8086/ws/chat.newGroup` | MessageMapping | Create a new group |
|`http://localhost:8086/joingGroup/teamId`                             | Post | User can join group|
|`http://localhost:8086/group/edit`                             | Put | Update groupDetails|
|`http://localhost:8086/group/invitation`                             | Post | when user is invited to the group |
|`http://localhost:8080/group/deleteInvitation/id`                             | Get | Delete invitation if it is rejected by user|





    
