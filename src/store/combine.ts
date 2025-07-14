import { create } from 'zustand';
import { devtools, combine } from 'zustand/middleware';

// Auth Slice
type AuthState = {
  user: string | null;
  isAuthenticated: boolean;
};

type AuthActions = {
  login: (username: string) => void;
  logout: () => void;
};

const createAuthSlice = () =>
  combine<AuthState, AuthActions>(
    {
      user: null,
      isAuthenticated: false,
    },
    (set) => ({
      login: (username: string) =>
        set(
          () => ({
            user: username,
            isAuthenticated: true,
          }),
          false
        ),

      logout: () =>
        set(
          () => ({
            user: null,
            isAuthenticated: false,
          }),
          false
        ),
    })
  );

// Settings Slice
type SettingsState = {
  theme: 'light' | 'dark';
  language: string;
};

type SettingsActions = {
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (lang: string) => void;
};

const createSettingsSlice = () =>
  combine<SettingsState, SettingsActions>(
    {
      theme: 'light',
      language: 'en',
    },
    (set) => ({
      setTheme: (theme) => set(() => ({ theme }), false),

      setLanguage: (lang) => set(() => ({ language: lang }), false),
    })
  );

// Final Store: Combine both slices
export const useAppStore = create<
  AuthState & AuthActions & SettingsState & SettingsActions
>()(
  devtools((...a) => ({
    ...createAuthSlice()(...a),
    ...createSettingsSlice()(...a),
  }))
);

// const isAuth = useAppStore((state) => state.isAuthenticated);
// const login = useAppStore((state) => state.login);
// const theme = useAppStore((state) => state.theme);
// const setTheme = useAppStore((state) => state.setTheme);

// login('alice');         // logs in
// setTheme('dark');       // sets dark mode
