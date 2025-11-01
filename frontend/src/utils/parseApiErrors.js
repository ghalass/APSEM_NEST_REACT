// src/utils/parseApiErrors.js

/**
 * Normalise les erreurs d'API en objet simple
 * @param {object} error - Erreur API (Axios, Fetch, etc.)
 * @returns {object} - { champ: "message d'erreur" }
 */
const parseApiErrors = (error) => {
  if (!error) return {}

  // Cas API REST type { errors: { email: "déjà pris" } }
  if (error.response?.data?.errors) {
    return error.response.data.errors
  }

  // Cas message unique
  if (error.response?.data?.error) {
    return error.response.data.error
  }

  // Cas GraphQL ou inconnu
  if (error.message) {
    return error.message
  }

  return {}
}

export default parseApiErrors
