use case 1 -> 
  Units table -> 
    Unit ID(Primary Key), Unit Name, Credits, Course ID(Foreign Key), On/off Shore, Unit Cordinator 
  Students table -> 
    First Name, Last Name, Student ID(Primary Key), Email Address, Course ID(Foreign Key), Residential Address, Date of Birth, Contact No.
  UnitsTakenUp -> historic data of students units
    Unit Taken ID(Primary Key), Student ID, Enrolment ID(Foreign Key)
  Marks ->
    Unit ID(Primary Key), Student ID, Mark, Enrolment ID(Foreign Key), Grade 
  Course -> what course a student takes up
    Couorse ID(Primary Key), Course Name, Faculty Name, Course Cordinator, Course duration, Total credits  
  Building ->
    Building ID(Primary Key), Building Name, Class Name
  Lecturer ->
    Lecturer ID(Primary Key), First name, Second Name, Contact No., Email Address, 
  Enrolment -> what sem and year you are in
    Enrolment ID(Primary Key), Enrolment Year, Intake, Campus Location, Course duration, Student ID(Foreign Key), Course ID(Foreign Key), Enrolled Date


