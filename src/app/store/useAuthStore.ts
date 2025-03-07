import { create } from 'zustand'

interface AuthState {
  user: { id: string; name: string } | null
  login: (user: { id: string; name: string }) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  login: (user) => set({ user }), // Lưu user vào state
  logout: () => set({ user: null }), // Xóa user khi logout
}))
