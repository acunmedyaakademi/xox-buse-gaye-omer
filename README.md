# XOX Game App

> A classic Tic Tac Toe game reimagined with a modern interface, user authentication, and score tracking.

## Project Overview

In this project, users start by choosing a game and then proceed to play Tic Tac Toe. After logging in, the player selects a preferred mark (X or O). According to the game rules, **X** always makes the first move. During gameplay, win, loss, and tie states are tracked, and scores are updated. The player can reset the round without resetting the scores.

## Core Features

- Game selection panel on the home screen.

![image](https://github.com/user-attachments/assets/a95d7c39-55a5-4259-b6b9-64dd7d842cf1)

- **Login/Register** screen: User authentication is required before playing.

![image](https://github.com/user-attachments/assets/91718f9d-a440-49e2-bf95-d3f3f3d40fd7)  
![image](https://github.com/user-attachments/assets/5151b995-ab88-41db-9f45-940ffd227f20)

- Player selects their desired mark (X or O).

![image](https://github.com/user-attachments/assets/f7a6b7f2-8885-442f-921b-e422f327d26e)

- Warning message is displayed if the player tries to start the game without selecting a mark.

![image](https://github.com/user-attachments/assets/62995d8d-951c-4f49-a1e7-f163c3752f6a)

- X always starts first. Turn order and logic are set accordingly based on the selected mark.

- Scoreboard tracks **User**, **Ties**, and **CPU** points.

![image](https://github.com/user-attachments/assets/f0812456-3929-4508-8a68-6b314d7763d0)

- Win, tie, or loss screen is shown when the game ends.

![image](https://github.com/user-attachments/assets/87327964-2225-4a58-ab9a-cca029d6e255)

- “Next Round” starts a new game while preserving scores.
- “Reset” button restarts the current round (scores remain intact).

## Team Contributions

### Gaye Dinç

- Created **Login** and **Register** screens.
- Contributed to writing game logic and state management in **Game.jsx**.
- Developed the player mark selection screen (**ChoicePage**).
- Integrated warning system to prevent game start without selecting a mark.
- Implemented win/loss/tie detection and score updates.
- Managed player mark persistence via LocalStorage.
- Designed **GameBanner** and implemented page navigation.
- Integrated Slick Carousel for animated game selection cards.
- Contributed to the turn order algorithm based on the selected mark.
- Helped fix CPU synchronization issues for stable gameplay.

### Ömer Kuluç

- Contributed to writing game logic and state management in **Game.jsx**.
- Used Context API to share player marks globally.
- Styled mobile-responsive components.
- Handled win/loss/tie detection and score updates.
- Built the reset logic.
- Contributed to the turn order algorithm based on the selected mark.
- Helped fix CPU synchronization issues for stable gameplay.

### Buse Savaş

- Contributed to writing game logic and state management in **Game.jsx**.
- Linked and styled **Login** and **Register** screens.
- Designed user flows based on navigation.
- Styled the interface and ensured responsiveness.
- Built and styled all modals.
- Integrated **Toastify** for real-time feedback.
- Contributed to the turn order algorithm based on the selected mark.

## Usage Flow

1. User selects a game on app startup.
2. When Tic Tac Toe is selected, a login screen appears.
3. After logging in, the user selects X or O.
4. The game starts, with X always going first.
5. Each move is followed by a win/tie check.
6. Scores update, and the game continues.
7. When the game ends, a modal shows the result, and the user can choose to start a new round or reset.

## Technologies Used

- **React.js** – UI and component structure
- **Context API** – Global state management
- **React Router** – Page navigation
- **LocalStorage** – Persistence of user preferences
- **Custom CSS** – Styling and responsive design
- **Slick Carousel** – Game selection slider on the homepage
- **SVG Icon Components** – Icons for X and O

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/xox-game-app.git

# 2. Navigate to the project directory
cd xox-game-app

# 3. Install dependencies
npm install
# or
yarn install

# 4. Start the development server
npm run dev
# or
yarn dev
```

The app will typically run at [http://localhost:5173](http://localhost:5173).

### 5. Open in Browser

Open the URL in your browser to start using the application.

##  Project Structure

```bash
src
 ┣ assets
 ┃ ┣ img
 ┃ ┣ Game.css
 ┃ ┗ reset.css
 ┣ pages
 ┃ ┣ Game.jsx
 ┃ ┣ ChoicePage.jsx
 ┃ ┣ GameBanner.jsx
 ┃ ┣ LoginRegister.jsx
 ┃ ┣ StartPage.jsx
 ┃ ┗ GameContext.jsx
 ┣ Svg.jsx              # X and O SVG components
 ┣ Router.jsx           # Routing logic
 ┣ App.jsx              # Root component
 ┣ App.css              # Global styles
 ┣ helper.js            # Utility functions
 ┗ main.jsx             # App entry point

README.md
index.html
vite.config.js
package.json
```

## Conclusion

**XOX Game App** brings a timeless classic into the modern age with a clean, intuitive interface. Featuring login/register support, mark selection, score tracking, and responsive design, it’s accessible on both mobile and desktop. This team project demonstrates strong collaboration and practical use of the React ecosystem.
