## Saving and retrieving work from any device.
Ability to save the work that is completed or incomplete and to retrieve that anytime through the system is the main purpose of the above functionality.

## How saving and retrieving works.
After user wants to stop the work and save the data in order to complete at a later period or the user wishes to save the completed work, initializes the save button and saves the data to the website.
The data then will be stored in a cloud server through the backend, allowing the user to retrieve at a later period.
If the user wishes to obtain the data using another device, the user has to sign in from the new device and the system should prompt the user about the last saved data in order to retreive. 

## How to create the saving and retrieving option.

## Saving.
1. User login to the website.
2. User engage in the functions and edit the work.
3. Initializes the save function.
4. Checks if the user’s account have space.
4. The work (session) created by the user then stored in a root of the local server (cloud storage) which the website   might need server side scripting language like Node.Js.

## Retrieving.
1. User login from a different device.
2. System prompts the relevant user of the latest saved session.
3. The system retrieves from the server and present it to the user.

## Sprint cases for saving and retrieving work.

1. Check user account space.
1. Implementing the logic in saving data to the server using backend.
2. Implement the retrieve functionality (querying the storage).
3. Develop the backend logic to support retrieval user’s latest saved session on different device.

