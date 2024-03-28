import { create } from 'zustand'

 

const useSelectToken = create((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose:()=>set({isOpen:false})
}))

export default useSelectToken;  