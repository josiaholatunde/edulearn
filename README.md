# EduLearn 
An Educational Learning Platform for Computer Science Concepts aims to provide an engaging and competitive environment for users to enhance their understanding of computer science through interactive games and online code challenges. The platform encourages learning by enabling users to compete individually or against others in various types of questions, spanning both multiple-choice and algorithmic problem-solving styles.

## Technologies
Server - Spring Boot (Java)
Student User Client Application - React (Javascript)
Admin/Lecturer Client Application - React (Javascript)
Database - MySQL
Deployment - AWS EC2 (Spring Server), AWS Amplify (React Application), AWS RDS (MySQL Instance), Namecheap (Domain Name Provider)



## Application Features/Requirements
**Essential**
- User Registration/Login - Users can easily register and log in to their accounts to access the platform's features.
- Admin/Lecturer Login- Admin/Lecturer can log in to their accounts to manage questions, competitions or application settings.
- Profile View - Users can view their personalised profiles showcasing their history of answered questions, badges earned, competitions won, and streaks.
- Leaderboard View- Users can view the leaderboard section which displays top users based on answered questions, departments, date joined, etc.
- Question Management - Admin can upload/create questions, assigning levels and difficulty ratings to each question.
- Competition Management - Admin can create specific competitions with unique challenges, allowing users to join and participate.
- Question Categories - Admin/Lecturer can manage question categories
- Configuration/System Settings- Admin/Lecturer can configure time limits for competitions/challenges, enable/disable leaderboard visibility for competitions, configure community rules.
- Game Types - Users can participate in two types of games: competitive sessions against other users with timed questions and individual challenges
- Learning Support - Users can view recommended solutions, receive feedback on compilation/runtime errors (for algorithm style questions), and access links to relevant learning resources

**Recommended**
- User/Admin Login - Additional functionality to login via OAuth/university login credentials
- User Progression Levels: Upon registration, users are automatically allocated an initial level of 10 and have the opportunity to advance to higher levels (1) by either answering a designated minimum of questions or achieving success in competitions.
- Admins can upload/create questions, assigning levels and difficulty ratings
- Admins can create specific competitions with unique challenges, allowing users to join and participate

**Optional**
- Multiple-choice style questions provide options to display answers immediately after each question or at the end
- A dedicated leaderboard section displays top users based on criteria such as answered questions, number of competitions, departments, current student year, date joined, etc
Badges, achievements, and rewards for user accomplishments to incentivize participation and engagement.
- Integration with social media platforms to allow users to share their achievements and invite friends to join the platform.


**General**
- The application handles validation form checks. Appropriate errors are displayed on the client when user enters an incorrect or invalid value
- The application also ensures that the voter id is unique during registration, validates that the user's date of birth isn't in
the future as no exact age requirement was given. The button to register or login become active once the form input is valid.
- The application also handles routing the user (Voter or Electoral Commission Officer) to the appropriate dashboard when login is successful
depending on the role of the user.
- The application handles Inconclusive results for constituencies where there is a tie in the result and also handles HUNG parliament scenario
no party fails to secure majority win in the number of seats.


## Installation

1. **Clone a working copy of the repository on SVN**
**Import the database schema file (ojo9_edulearn.sql) into your preferred database**: This should create a MySQL database with the required 
schema and default admin user credentials. This should also create an admin with user login credentials below
```agsl
username: admin@edulearn.ng
password: password
```
2. **Database Setup**: Verify that the database credentials in the `application.properties` file within the `api` directory are valid.
   If not, kindly modify the database name, database user credentials as required. The application by default connects to a MySQL database
   and has the dependency for the required driver to connect to the database.
   Also,if you are running the server locally, ensure that this config app.cors.allowedOrigins contains the url of the client e.g. http://localhost:3000 (for the client or admin react app) else the server would return CORS error which is a standard for cross origin requests

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
To build a production version of the react app, please run the command `npm run build`

4. **Deployment**: The application has also been deployed to the internet and can be accessed through https://edulearn-uol.com/ (Edulearn Student User Application) and https://admin.edulearn-uol.com (Edulearn Admin Application)
 

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