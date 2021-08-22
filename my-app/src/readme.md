# Developer Guide to Target API CLI

This guide contains instructions on what calls have been created and how to call them

- getJWTTOken.js - Stores credentials required for retrieving the JWT Token from Adobe I/O
- getAccessCode.js - Retrieves the access token required for making Target API calls (exports access_token as getAccessToken)
- getActivities.js - Retrieves a list of Target activities (exports json object as getActivities)
	- Parameter (filter). If filter is present, will only retrieve activities of that type
- getActivityById.js - Retrieves a Target activity (exports json object as getActivityById)
	- Parameters (id,type). Both parameters are required. id is the id of the activity (e.g. 261128), type is the activity type (e.g. ab)
- countActivities.js - Does a count of all activities, and groups based on the naming convention used for activities (PZN | Home | ...). Grouping happens at both experimentation (EXP) or personalisation (PZN) level, and RACV sile (Home, Motor, Travel etc.).
	- Parameters (filter). An optional parameter passed as --filter=filter which retrieves only activities of a certain type
- findInActivities.js - Searches for a string passed in as a parameter within activities.
	- Parameters (queryString,filter). queryString (--queryString=string) is required and is the search term you wish to search for, while filter is an optional parameter passed as --filter=filter which searches within only activities of a certain type

## Start backend server with ./services/ **npm run dev**
**Calls to from front end will be proxied through this backend server to get around CORS**

## Start front end with **npm start**