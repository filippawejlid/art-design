import { defineStore } from "pinia";

export const useUserStore = defineStore("User", {
  state: () => {
    return {
      isAdmin: false,
    };
  },
  getters: {
    getIsAdmin(): boolean {
      return this.isAdmin;
    },
  },
  actions: {
    setIsAdmin(isAdmin: boolean) {
      this.isAdmin = isAdmin;
    },
  },
});
