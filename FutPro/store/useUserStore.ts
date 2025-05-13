import { defineStore } from "pinia";
import { ref } from "vue";

interface User {
    name?: string;
    email: string;
    photoURL?: string;
    telefone?: string;
    role?: string;
}

export const useUserStore = defineStore("user", () => {
    const token = ref("");
    const user = ref<User>({
        name: "",
        email: "",
        photoURL: "",
        telefone: "",
        role: "",
    });

    const setToken = (newToken: string) => (token.value = newToken);
    const setUser = (newUser: any) => (user.value = newUser);

    return { token, setToken, user, setUser };
});
