/**
 * Bayaak.co API Configuration
 * Supports switching between live API endpoints and the local demo data provider.
 */

export const API_CONFIG = {
  // Base URL for production / staging REST API
  BASE_URL: import.meta.env.VITE_API_BASE_URL || '',
  
  // Explicit flag or fallback: if no BASE_URL is provided, we operate in Demo Data Mode
  IS_DEMO_MODE: !import.meta.env.VITE_API_BASE_URL || import.meta.env.VITE_USE_DEMO_DATA === 'true',
  
  // Timeout in milliseconds
  TIMEOUT_MS: 10000,
  
  // Simulated network latency for demo mode to test realistic loading skeletons
  DEMO_LATENCY_MS: 250,
};

export const logApiState = () => {
  if (API_CONFIG.IS_DEMO_MODE) {
    console.info(
      '%c[Bayaak Demo Provider]%c Operating in High-Fidelity Demo Data Mode with Arabic Multi-Store Catalog.',
      'background: #D4AF37; color: #0B192C; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #64748b; margin-left: 8px;'
    );
  } else {
    console.info(
      `%c[Bayaak Live API]%c Connected to ${API_CONFIG.BASE_URL}`,
      'background: #0B192C; color: #D4AF37; font-weight: bold; padding: 2px 6px; border-radius: 4px;',
      'color: #64748b; margin-left: 8px;'
    );
  }
};
