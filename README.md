# Podcast App

## Project Overview
Welcome to the Podcast App, a React-based application built with Vite that allows users to browse, search, and explore podcast shows with detailed season and episode information. This project, developed as part of the DJS05 assignment, showcases dynamic routing, state management, API data fetching, and responsive design. The app features a unique cosmic theme with a Neon Nebula Purple header and a Deep Space Black to Starlit Indigo gradient background, giving it an out-of-this-world aesthetic.

## Instructions for Running Locally
1. **Initialize the Project** (if not already set up):
   - Run `npm create vite@latest . -- --template react` in the project directory.
2. **Install Dependencies**:
   - Run `npm install` to install core dependencies.
   - Run `npm install react-router-dom` to add routing capabilities.
3. **Add Project Files**:
   - Replace the default files with the provided `index.html`, `vite.config.js`, `src/` directory contents (including `App.jsx`, `components/`, and `utils/`), and `App.css`.
4. **Start the Development Server**:
   - Run `npm run dev` to launch the app.
   - Open `http://localhost:5173` (or the port specified in the terminal) in your browser.
5. **Optional Favicon**:
   - To eliminate the 404 error for `favicon.ico`, place a `favicon.ico` file in the `public/` directory.

## Main Features
- **Homepage**: Displays a searchable and filterable list of podcasts by genre, with clickable cards navigating to detail pages.
- **Dynamic Show Detail Pages**: Unique pages for each podcast (e.g., `/shows/:id`) showing title, large image, description, genres, last updated date, and total seasons/episodes.
- **Season Navigation**: A dropdown selector allows users to switch between seasons, with episodes listed below, flowing downward for easy access.
- **State Preservation**: Filters and search terms persist when navigating back to the homepage.
- **Loading and Error Handling**: Graceful management of loading states, errors, and empty results.
- **Responsive Design**: Adapts seamlessly across desktop, tablet, and mobile devices with a cosmic color scheme (Neon Nebula Purple #6B21A8 header, Cosmic Gradient #0D0D0D to #2A1E5E background).
- **Code Quality**: Modular React components with JSDoc comments and consistent formatting.

## Known Limitations
- **Episode Durations and Release Dates**: The API (`https://podcast-api.netlify.app`) does not provide episode durations or individual release dates.
- **Audio Playback**: Placeholder audio URLs are used; actual playback is not implemented.
- **Favicon**: A 404 error occurs if `public/favicon.ico` is missing (cosmetic issue only).

## Technologies Used
- **React**: For building the user interface and managing state.
- **Vite**: As the development server and build tool for fast performance.
- **react-router-dom**: For dynamic routing and navigation.
- **CSS**: Custom styling with a cosmic theme and responsive design.

## Project Structure
- `public/`: Contains static assets (e.g., `favicon.ico`).
- `src/`: 
  - `App.jsx`: Main application with routing.
  - `components/`: React components (`HomePage.jsx`, `ShowDetail.jsx`, `ShowCard.jsx`, `EpisodeCard.jsx`, `SeasonSelector.jsx`).
  - `utils/`: Utility files (`genreMap.js`, `formatDate.js``Pagination.jsx` ).
  - `App.css`: Global styles with cosmic theme.
- `vite.config.js`: Vite configuration.
- `index.html`: Root HTML file with Google Fonts.

## Contribution Guidelines
This project is tailored for the DJS05 assignment. For contributions or enhancements, fork the repository, create a new branch, and submit a pull request with detailed changes. Ensure JSDoc and consistent formatting are maintained.

## License
This project is for educational purposes only and does not have an open-source license. Usage is restricted to the DJS05 assignment context.

## Acknowledgments
- API data provided by `https://podcast-api.netlify.app`.
- Inspired by cosmic aesthetics for a unique user experience.