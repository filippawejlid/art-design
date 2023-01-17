import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
export const useUserStore = defineStore("User", {
  state: () => {
    return {
      isAdmin: useStorage("isAdmin", false),
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
