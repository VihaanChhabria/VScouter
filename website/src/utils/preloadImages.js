/**
 * Central list of all image assets used in the app and a preload function.
 * Uses Vite's URL constructor so paths resolve correctly in production (Netlify).
 */

const ASSET_URLS = [
  // Home
  new URL("../assets/VScouterLogo.png", import.meta.url).href,
  new URL("../assets/FRCLogo.svg", import.meta.url).href,
  // Auto scoring
  new URL("../assets/FullFieldMap.png", import.meta.url).href,
  new URL("../assets/DriveIcon.svg", import.meta.url).href,
  new URL("../assets/ShotIcon.svg", import.meta.url).href,
  // Teleop scoring
  new URL("../assets/TeleopScoringImages/CenterPickUp.png", import.meta.url).href,
  new URL("../assets/TeleopScoringImages/CenterShuttle.png", import.meta.url).href,
  new URL("../assets/TeleopScoringImages/ReceivedShuttle.png", import.meta.url).href,
  new URL("../assets/TeleopScoringImages/DepotOrOutpost.png", import.meta.url).href,
];

/**
 * Preload all app images so they are ready when the user navigates to each page.
 * Call once on app mount (e.g. in App.jsx useEffect).
 */
export function preloadAppImages() {
  ASSET_URLS.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}
