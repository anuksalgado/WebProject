## Usage of the fact and dim tables where dim tables are descriptive.
## Fact table includes a table which has numerical data

Fact Table: Fact_Enrolment
Enrolment ID (Primary Key)
Student ID (Foreign Key to Dim_Students)
Course ID (Foreign Key to Dim_Courses)
Unit ID (Foreign Key to Dim_Units)
Enrolment Year
Intake
Campus Location
Enrolled Date
Grade (Optional: could also be left in a separate Fact_Marks table)


Dimension Tables ->
Dim_Students:
Student ID (Primary Key)
First Name
Last Name
Email Address
Residential Address
Date of Birth
Contact No.

Dim_Courses:
Course ID (Primary Key)
Course Name
Faculty Name
Course Coordinator
Course Duration
Total Credits

Dim_Units:
Unit ID (Primary Key)
Unit Name
Credits
Course ID (Foreign Key)
On/Off Shore
Unit Coordinator

Dim_Lecturers:
Lecturer ID (Primary Key)
First Name
Second Name
Contact No.
Email Address

Dim_Buildings:
Building ID (Primary Key)
Building Name
Class Name