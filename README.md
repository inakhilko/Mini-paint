# Mini-Paint

Mini-Paint is a web application that allows users to create, save, and manage their paintings. A user can create a new account using the Sign Up form. After creating an account, the user can log in using the Sign In form. The application allows the user who is signed in to create paintings using the painting tools, save them and edit after saving. The saved paintings can be seen from the Home Page.

## Task

The description of the task and instructions for its performance can be found [HERE](./docs/Innowise-Lab-Internship_Level2_Mini-paint.pdf).

## Project Structure

The Project is structured as follows:
* src/
  * _pages/_: Page components (e.g., HomePage)
  * _modules/_: Feature-specific modules (e.g., SignInForm, SignUpForm)
  * _components/_: Reusable components
  * _UI/_: UI components (e.g., Loader)
  * _router/_: Routing components (e.g., PublicRouter, PrivateRouter)
  * _store/_: Redux store and slices
  * _App.tsx_: Main application component
  * _index.tsx_: Entry point

## Application stack

The application uses the following technologies. The application is written with the use of _React_ and _TypeScript_. _Firebase_ is used for authentication and data storage. _Redux_ is used for state management, and _React Router_ is used for routing. _SCSS_ is used for styling.

## How to run the app

1. Clone the repository:
   ```bash
   git clone https://github.com/inakhilko/Mini-paint
   cd mini-paint 
   npm install 
   ```
2. Create a .env file in the root directory and add your Firebase configuration as follows:

<pre>
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id 
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket 
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id 
VITE_FIREBASE_APP_ID=your_app_id 
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id 
VITE_FIREBASE_DATABASE_URL=your_database_url
</pre>

3. To start the development server:  ```npm run dev```

## Database snapshot

The structure of the Firebase Realtime Database for the Mini-Paint application is organized as follows:
* Root
  * users
    * userId
    * email: User's email address
    * name: User's name
  * pictures
    * userId
      * pictureId
        * imageUrl: URL of the image
        * imageId: Unique identifier for the image
        * createdAt: Timestamp of when the image was created
        * updatedAt: Timestamp of when the image was last updated
