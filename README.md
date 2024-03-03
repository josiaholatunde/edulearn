# EduLearn 
Server - Spring Boot (Java)
Client - React (Javascript)

An Educational Learning Platform for Computer Science Concepts aims to provide an engaging and competitive environment for users to enhance their understanding of computer science through interactive games and online code challenges. The platform encourages learning by enabling users to compete individually or against others in various types of questions, spanning both multiple-choice and algorithmic problem-solving styles.

## Features (Role based)
Admin
- **User Authentication**: Admins can log in and monitor election.
- **View Profile**: Admins can see election poll results grouped by constituencies as well as overall results via a Bar chart one the election ends.
- **Manage Questions and Competitions**: Admins can start, and stop elections. Only after starting an election would candidates be able to vote for candidates

- User
- **User Authentication**: Register and log in securely to vote.
- **Participate in Challenges**: Users can scan a unique 8 digit QR code or manually enter their unique voter code.
- **Participate in Competitions**: Users can only vote for candidates within their constituencies and can not edit their votes after voting.
- **ACL**: Only logged in voters can vote and view the voters dashboard. 
Also, logged in voters can only see the option to vote for candidates within their constituency
- 
- 
**General**
- The application handles validation form checks. Appropriate errors are displayed on the client when user enters an incorrect or invalid value
- The application also ensures that the voter id is unique during registration, validates that the user's date of birth isn't in
the future as no exact age requirement was given. The button to register or login become active once the form input is valid.
- The application also handles routing the user (Voter or Electoral Commission Officer) to the appropriate dashboard when login is successful
depending on the role of the user.
- The application handles Inconclusive results for constituencies where there is a tie in the result and also handles HUNG parliament scenario
no party fails to secure majority win in the number of seats.


## Installation

1. **Import the database schema file (ojo9.sql) into your preferred database**: This should create an MySQL database with the required 
default records. The default schema file contains 2 voters with user login credentials below
```agsl
username/voter_id: kola@gmail.com
password: password

username/voter_id: amao@gmail.com
password: password
```

This should also create an admin with user login credentials below
```agsl
username: election@shangrila.gov.sr
password: shangrila2024$
```
2. **Database Setup**: Verify that the database credentials in the `application.properties` file within the `api` directory are valid.
   If not, kindly modify the database name, database user credentials as required. The application by default connects to a MySQL database
   and has the dependency for the required driver to connect to the database.

3. **Install/Download Dependencies and Start Application**: Please check the usage section for more details.
   N.B. The application uses Maven package manager, so ensure that it is installed before starting up the application.

## Usage
1. **Run the Application**: Execute the commands below
    a. Change directory to the `client/` folder by executing the command `cd client/`
    b. Execute the command `npm install && npm start` in the project directory to install dependencies for the client application.
    c. Open a new terminal and change directory to the `api/` folder by executing the command `cd api/`
    d. Execute the command `mvn clean install spring-boot:run -DskipTests` in the project directory.
2. **Access the Application**: Open a web browser and visit `http://localhost:3000` to use the application. 
Also verify that the server is running on port 9990 (default configurable port in application.properties)
 

## Dependencies
- **Maven**
- **Java 17**
- **React.js**
- **Node >=14**

## Technologies Used
- **Spring Boot**: Framework for building web applications.
- **JPA/Hibernate**: ORM for database interactions.
- **Java Programming Language**: Primary language used for the server in the application.
- **React.js**: Open source javascript library used for the client in the application.

## Contributing
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/fooBar`).
3. Commit your changes (`git commit -am 'Add some fooBar'`).
4. Push to the branch (`git push origin feature/fooBar`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.