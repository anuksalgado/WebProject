Use Cases – defines the functional requirements of the project.

# Feature: Device compatibility

**Bullet point 1**

Use Case 1: Saving and Retrieving Work from Any Device

Goal: Provide users with the capability to save their work within the system and retrieve it from any compatible device at any time.

Primary Actor: User

Trigger: The user wishes to save their work within the system or retrieve previously saved work.

Flow of Events:

Saving Work:

1. The user initiates the save function within the system while working on their project or document.

2. The system stores the user's work, which includes documents, projects, configurations, or any other data.

3. The saved work is associated with the user's account, ensuring it is accessible from any device they use.

(I've divided into two flow events)

Retrieving Work:

4. The user accesses the system from a different compatible device.

5. The system identifies the user upon login and retrieves their previously saved work.

6. The user can browse and open their saved work, continuing where they left off.

Extensions:

1A - Insufficient Storage Space:

- If the user's account has insufficient storage space to save their work, the system informs the user and may prompt them to free up space or purchase additional storage.

- The user can choose to delete unnecessary data to make space or upgrade their storage plan.


# Feature: Interface Personalization

**Bullet point 1**

Use Case 1: Customizing Tabs and Tools

Goal: Allow users, specifically students, to customize the tabs and tools in the system's interface according to their needs and preferences.

Primary Actor: User (Student)

Trigger: The user accesses the system's interface and wishes to customize tabs and tools.

Flow of Events:

1. The user logs into the system.
2. The system displays the default interface with a set of tabs and tools.
3. The user accesses the customization feature, which allows them to modify the interface.
4. The user can add, remove, or rearrange tabs and tools on the interface to match their specific requirements.
5. The system saves the user's customization preferences for future sessions.

**Bullet point 2**

Use Case 2: Using Calendar with Important Dates

Goal: Provide a calendar feature within the system where important dates, such as events, submission deadlines, webinars, and tutorial sessions among peers, are included.

Primary Actor: User (Student)

Trigger: The user accesses the system and wants to view or manage important dates.

Flow of Events:

1. The user logs into the system.
2. The system provides access to a calendar feature displaying important dates.
3. Important dates, including events, submission deadlines, webinars, and tutorial sessions, are visible on the calendar.
4. The user can view and interact with these dates, such as clicking on an event to see details or adding personal events and reminders.
5. The system may provide options for the user to set reminders or receive notifications for upcoming events or deadlines.

# Feature Personalized tools.

Use Case 1: Document Converter

Goal: Provide students with a document converter tool within the system, allowing them to convert their documents into other valid formats when needed.

Primary Actor: Student

Trigger: The student needs to submit a document in a different valid format.

Flow of Events:

1. The student accesses the system and navigates to the document converter tool.
2. The tool presents options for selecting the source format (e.g., doc, docx, pdf) and the desired output format.
3. The student uploads the document they wish to convert.
4. The system processes the document and converts it into the selected format.
5. The converted document is made available for download.

Use Case 2: Multiple Categorized Notebooks

Goal: Provide an interface where users can create and categorize multiple notebooks according to their preferences and save them online for convenient access from any location.

Primary Actor: User (Student)

Trigger: The user wants to organize and access their notes and work in an organized manner.

Flow of Events:

1. The user accesses the system's interface for creating and managing notebooks.
2. The system allows the user to create multiple notebooks and assign categories or labels to them.
3. The user can open a specific notebook, create new entries, and categorize them accordingly.
4. The system saves the notebooks and their contents online, ensuring they are accessible from any compatible device.
5. The user can access their notebooks, edit, and review their contents at any time and from any location.

Use Case 3: Word Count Tool

Goal: Provide students with a word count tool for calculating the approximate word count of a document in doc, docx, or pdf file formats.

Primary Actor: Student

Trigger: The student needs to calculate the word count of a document.

Flow of Events:

1. The student accesses the system and selects the word count tool.
2. The tool allows the student to upload the document for which they want to calculate the word count.
3. The system analyzes the document and provides an approximate word count.
4. The student can view and note the word count for their assignment or document.

Use Case 4: Marks Calculation and Visualization

Goal: Provide a tool for students to calculate the marks needed to achieve a target mark for a specific unit. The tool should also offer visual representation of their progress in achieving the target.

Primary Actor: Student

Trigger: The student wants to set a target mark for a unit and calculate the required marks.

Flow of Events:

1. The student accesses the marks calculation tool within the system.
2. The tool allows the student to set a target mark for a specific unit they are enrolled in.
3. The student enters their marks for tests or assessments as they progress through the unit.
4. The system calculates the marks needed to achieve the target based on the entered marks.
5. The tool provides a visual chart or representation showing the student's progress towards their target mark.

# **Feature: Notifications**

Use Case 1: Sending Relevant Notifications

Goal: Ensure that the system sends relevant notifications to students, including important system updates, events based on the student's profile settings, and chat notifications from peers.

Primary Actor: System

Trigger: Various events and updates within the system trigger notifications to be sent to students.

Flow of Events:

1. The system monitors various events, such as system updates, important events, and chat messages from peers.
2. When relevant events occur, the system sends notifications to the respective students.
3. The student receives notifications based on their profile settings and preferences, which may include email notifications and system notifications within the platform.
4. Students can review and respond to these notifications as needed.

# **Feature: Privacy and security**

Use Case 1: Email Address Authentication

Goal: Authenticate a student's email address using a third-party authenticator to prevent fraud and identity theft.

Primary Actor: Student

Trigger: The student needs to verify their email address for system access.

Flow of Events:

1. The student initiates the email address verification process within the system.
2. The system requests the student to input their email address.
3. The system interfaces with a third-party authenticator for email verification.
4. The third-party authenticator sends a verification code or link to the student's email address.
5. The student accesses their email account and retrieves the verification code or clicks on the verification link.
6. The student enters the verification code or confirms the link in the system to complete the email address authentication.
7. Upon successful verification, the system marks the student's email address as authenticated.

Use Case 2: App Access Permission

Goal: Request access to specific apps, such as photos and inboxes, with granted access ensuring the system maintains the user's privacy and data confidentiality.

Primary Actor: User (Student)

Trigger: The user is prompted to grant access to certain apps for system functionality.

Flow of Events:

1. The user initiates a feature or action within the system that requires access to specific apps, such as photos or inboxes.
2. The system displays a permission request, explaining why it needs access to the specified apps and how this access will be used.
3. The user is presented with the option to grant or deny access.
4. If the user grants access, the system can use the requested app functionality to enhance the user experience.
5. The system ensures that any data accessed from the apps is used in compliance with privacy regulations and is kept confidential.
6. The user's data and privacy are safeguarded, and access is utilized only for the intended purpose.