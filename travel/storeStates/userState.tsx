import { create } from 'zustand';

interface UserStore {
    userSt: any;
    setUserSt: (userSt: any) => void;
    userPost: any;
    setUserPost: (userSt: any) => void;
    userGroup: any;
    setUserGroup: (userSt: any) => void;
   }
   
   const useUserStore = create<UserStore>((set) => ({
    userSt: [],
    setUserSt: (userSt) => set(() => ({ userSt })),
    userPost: [],
    setUserPost: (userPost) => set(() => ({ userPost })),
    userGroup: [],
    setUserGroup: (userPost) => set(() => ({ userPost })),
   }));

export default useUserStore