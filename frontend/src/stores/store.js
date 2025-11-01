import { create } from 'zustand'

// Fonction pour récupérer la langue sauvegardée ou utiliser 'fr' par défaut
const getInitialLang = () => localStorage.getItem('lang') || 'fr'

const useUIStore = create((set) => ({
  isModalOpen: false,
  op: 'create',

  openModal: () => set({ isModalOpen: true }),
  closeModal: () => set({ isModalOpen: false }),
  setOp: (o) => set({ op: o }),

  lang: getInitialLang(),
  changeLang: (l) => {
    localStorage.setItem('lang', l) // Persistance
    set({ lang: l })
  },
}))

export default useUIStore
