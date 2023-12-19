import { create } from 'zustand';

interface UserStore {
    userSt: any;
    setUserSt: (userSt: any) => void;
   }
   
   const useUserStore = create<UserStore>((set) => ({
    userSt: [],
    setUserSt: (userSt) => set(() => ({ userSt })),
   }));

export default useUserStore