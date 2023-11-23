Use Cases – defines the functional requirements of the project.

# Feature: Accessibility:

**Bullet point 1**

Use Case: Speech-to-Text Engine in a Note Taking App

Goal: Enable users, especially students, to efficiently transcribe spoken content into text notes during lectures, ensuring that important information is captured and organized.

Primary Actor: User (e.g., students)

Preconditions:

1. The user has a registered account with the note-taking app.

2. The user has access to a device with a microphone and an internet connection.

3. The user has logged into the note-taking app.

Trigger: The user initiates the speech-to-text feature within the note-taking app during a lecture or other spoken content.

Flow of Events:

1. The user opens the note-taking app and accesses the speech-to-text feature.
2. The app activates the device's microphone, ready to capture spoken content.
3. The user starts the recording or transcription process.
4. The app begins converting the spoken content into text in real-time and displays it on the screen.
5. The user has the option to pause and resume the transcription process as needed.
6. The transcribed text is automatically saved within the app as a new note.
7. The user can review, edit, or format the transcribed notes for clarity and organization.

Extensions:

2A - Poor Audio Quality:

- If the app detects poor audio quality, it may prompt the user to adjust the microphone position or recommend using an external microphone.

- The user can choose to continue or exit the transcription process.

- The use case resumes at step 4.

3A - User Wants to Annotate:

- If the user wishes to add personal annotations or comments to the transcribed notes, they can do so during or after the transcription process.

- The user can add annotations to specific parts of the text.

4A - User Wants to Share Notes:

- If the user wants to share the transcribed notes with others, they can use the app's sharing feature to send the notes via email, messaging apps, or other sharing methods.

**Bullet point 2**

Use Case: Built-In Search Engines in a Student Resource System

Goal: Provide students with the ability to search for specific keywords and phrases within the student resource system to quickly access relevant materials and information as needed.

Primary Actor: Student

Preconditions:

1. The student has a registered account with the student resource system.

2. The student has logged into the student resource system.

Trigger: The student initiates a search for specific keywords and phrases within the student resource system.

Flow of Events:

1. The student opens the student resource system and accesses the built-in search feature.
2. The system has a search bar and allows the student to enter keywords and phrases.
3. The student enters the keywords and phrases they want to search for and starts the search.
4. The system processes the search request and retrieves relevant information that match the entered keywords.
5. The search results are displayed to the student.
6. The student can click on a search result to access the detailed information or material.
7. The system may provide filters for example, for dates.
8. The student can perform multiple searches to find different materials or information as needed.

Extensions:

2A - No Search Results Found:

- If the system cannot find any matching results for the entered keywords and phrases, it informs the student that no results were found.

- The student may refine the search query or choose different keywords to try again.

- The use case resumes at step 2.

4A - Multiple Search Results:

- If the search results have many matches, the system may provide options to navigate through the results.

- The student can navigate through multiple pages of search results to find the most relevant materials.

6A - Preview of Search Results:

- The system may offer a brief preview or summary of search results to help the student assess relevance before clicking on a result.

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

# Feature: Peer to Peer communication

Use Case 1: Peer to Peer Communication

**Bullet point 1**

Goal: Enable users to interact with each other and participate in online classrooms, webinars, and discussion forums.

Primary Actor: User

Trigger: The user accesses the system's online classrooms, webinars, or discussion forums.

Flow of Events:

1. The user accesses the system's online learning environment, which includes online classrooms, webinars, or discussion forums.
2. Within these environments, the system provides a user-friendly interface for users to interact, engage in discussions with others.
3. Users can participate in live discussions, ask questions, provide answers, and share their thoughts with other participants.
4. Users may also have the option to use video and audio to present themselves.
5. Users can engage in text-based chats and discussions with peers, instructors, or moderators.
6. The system ensures that user interactions are in accordance with community guidelines and acceptable use policies.

Extensions:

3A - Violation of Community Guidelines:

- If a user violates community guidelines, moderators or administrators may issue warnings or take appropriate actions to maintain a respectful and safe environment.

- The user may be temporarily or permanently restricted from participating in certain features or environments.

Use Case 2: Private Monitored Chat Forum

**Bullet point 2**

Goal: Provide users with a separate forum where they can communicate with other users privately in a monitored chat environment.

Primary Actor: User

Trigger: The user accesses the private monitored chat forum within the system.

Flow of Events:

1. The user navigates to the private monitored chat forum within the system.
2. In this forum, users can initiate private one-on-one or group chats with other users.
3. All communication within the private chat forum is monitored by the system to ensure compliance with guidelines and policies.
4. Users can exchange messages, files, and multimedia content within the private chat forum while knowing that their conversations are being monitored for safety and compliance.
5. The system may automatically filter or flag inappropriate content for review by moderators or administrators.

Extensions:

3A - Violation of Forum Policies:

- If a user engages in behavior that violates forum policies, the system may issue warnings, restrict access, or take appropriate actions to maintain a safe and respectful environment.

- The user may be temporarily or permanently restricted from using the private monitored chat forum.

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