import { AppProviders } from './providers';

/**
 * Root Application Component.
 * Pure container component responsible only for initializing application providers.
 *
 * @returns {JSX.Element} The rendered provider tree.
 */
function App() {
  return <AppProviders />;
}

export default App;
