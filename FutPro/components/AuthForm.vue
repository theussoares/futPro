<template>
  <form
    @submit.prevent="handleSubmit"
    :class="
      clsx('flex flex-col items-center w-full max-w-sm mx-auto', {
        'gap-20': !isSignUp,
        'gap-4': isSignUp,
      })
    "
  >
    <div class="flex flex-col items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.0"
        :width="isSignUp ? '100px' : '175.000000pt'"
        :height="isSignUp ? '80px' : '142.000000pt'"
        viewBox="0 0 175.000000 142.000000"
        preserveAspectRatio="xMidYMid meet"
      >
        <g
          transform="translate(0.000000,142.000000) scale(0.100000,-0.100000)"
          fill="#000000"
          stroke="none"
        >
          <path
            d="M763 1176 c-91 -22 -164 -65 -238 -140 -81 -82 -119 -150 -141 -256 -50 -239 98 -505 328 -589 77 -28 203 -38 278 -22 91 20 189 73 256 141 104 103 154 224 154 370 0 200 -104 367 -283 455 -112 54 -237 69 -354 41z m-19 -61 c-14 -22 -15 -25 -1 -25 9 0 45 -15 80 -34 l65 -34 67 34 c37 19 74 34 82 34 10 0 11 4 3 19 -15 29 -13 31 23 19 42 -15 156 -88 186 -122 l24 -26 -29 0 -29 0 0 -86 c0 -74 -3 -88 -20 -101 -20 -15 -20 -15 1 -9 18 5 33 -5 78 -55 31 -34 56 -67 56 -73 0 -6 9 0 20 14 l20 25 0 -47 c0 -62 -43 -195 -75 -233 l-26 -30 4 28 c2 15 1 29 -3 32 -3 2 -35 -5 -69 -15 -93 -30 -100 -28 -148 36 l-41 57 14 46 c8 25 21 71 29 101 8 30 23 61 33 69 16 13 16 13 -1 8 -12 -5 -45 15 -108 63 l-91 70 -52 -41 c-28 -23 -69 -55 -91 -72 l-41 -31 28 -96 c15 -52 28 -102 28 -111 0 -9 -16 -37 -35 -63 -20 -25 -32 -46 -28 -46 4 1 22 20 40 45 32 43 33 43 105 50 40 4 93 5 117 3 40 -3 48 -8 88 -60 52 -66 52 -77 -2 -158 -35 -52 -37 -70 -9 -70 8 0 14 -4 14 -9 0 -5 -32 -15 -72 -21 -74 -13 -164 -8 -233 12 l-40 11 33 9 c33 9 33 10 18 31 -27 37 -66 115 -66 132 0 10 -10 15 -29 15 -16 0 -58 9 -93 20 -34 11 -65 20 -67 20 -2 0 0 -17 4 -37 6 -37 6 -37 -10 -16 -42 59 -76 153 -82 225 -5 70 -4 72 12 50 l16 -22 36 47 c19 27 47 58 61 70 25 21 27 27 27 118 l1 95 -31 0 -30 1 55 50 c51 46 158 108 188 109 9 0 8 -7 -4 -25z"
          />
          <path
            d="M883 950 c0 -36 2 -50 4 -32 2 17 2 47 0 65 -2 17 -4 3 -4 -33z"
          />
          <path
            d="M610 770 c19 -11 40 -19 45 -19 6 0 -6 8 -25 19 -19 11 -39 19 -45 19 -5 0 6 -8 25 -19z"
          />
          <path
            d="M1130 765 c-14 -8 -20 -14 -15 -14 6 0 21 6 35 14 14 8 21 14 15 14 -5 0 -21 -6 -35 -14z"
          />
        </g>
      </svg>
      <h1 class="text-xl font-bold">{{ title }}</h1>
    </div>

    <div class="w-full flex flex-col gap-2" v-if="isSignUp">
      <InputField
        id="name"
        label="Name"
        placeholder="Full Name"
        type="text"
        v-model="form.name"
        :errorMessage="errors.name"
      />

      <InputField
        id="email"
        label="Email"
        placeholder="Email"
        type="email"
        v-model="form.email"
        :disabled="form.email !== ''"
        :errorMessage="errors.email"
      />

      <InputField
        id="telefone"
        label="Telefone"
        placeholder="Telefone"
        type="tel"
        inputmode="numeric"
        v-model="form.telefone"
        :maxlength="15"
        :errorMessage="errors.telefone"
        @blur="formatTel(form.telefone)"
      />

      <Select @update="form.role = $event" :errorMessage="errors.role" />

      <button
        type="submit"
        class="w-full py-3 cursor-pointer mt-4 rounded-md text-white font-semibold bg-green-600 hover:bg-green-700 disabled:bg-green-200"
        v-if="isSignUp"
        @click="handleSubmit"
        :disabled="
          form.telefone === '' ||
          form.role === '' ||
          form.name === '' ||
          form.email === ''
        "
      >
        Finaliza cadastro
      </button>
    </div>

    <p class="text-sm text-gray-600" v-if="isSignUp">
      Já tem conta?
      <a
        href="#"
        class="text-green-600 font-semibold ml-1 cursor-pointer"
        @click.prevent="toggleForm"
      >
        Faça login
      </a>
    </p>
  </form>
  <button
    v-if="!isSignUp"
    @click="loginWithGoogle"
    class="text-[#000] border-2 border-[#000] px-2 py-3 rounded-md mt-20"
  >
    <div class="flex items-center gap-2">
      <NuxtImg
        src="/images/google.webp"
        alt="Logo do google"
        width="20"
        height="20"
      />
      <p class="text-sm">
        {{ loading ? "Verificando.." : "Continuar com Google" }}
      </p>
    </div>
  </button>
</template>

<script setup lang="ts">
import clsx from "clsx";
import { reactive, ref } from "vue";
import InputField from "./InputField.vue";
import { useFirebase } from "~/composable/useFirebase";
import { useUserStore } from "@/store/useUserStore";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { errorMessages } from "vue/compiler-sfc";

interface Props {
  title: string;
  isSignUp: boolean;
  onToggleForm: () => void;
}

const props = defineProps<Props>();

const userStore = useUserStore();
const { signInWithPopup, auth, provider } = useFirebase();
const userAuth = ref<any>("");
const loading = ref(false);
const form = reactive({
  name: "",
  email: "",
  telefone: "",
  role: "",
});

const loginWithGoogle = async () => {
  try {
    loading.value = true;
    const result = await signInWithPopup(auth, provider);
    userAuth.value = result;
    userStore.setUser({
      name: result.user.displayName,
      email: result.user.email,
      photoURL: result.user.photoURL,
    });
    const db = getFirestore();
    const Auth = getAuth();
    const authUser = Auth.currentUser;

    if (authUser) {
      const userDocRef = doc(db, "users", authUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        if (userData.telefone) {
          emit("cadastroComplete", {
            name: userData.nome,
            email: userData.email,
            telefone: userData.telefone,
            photoURL: userData.photoURL,
            role: userData.role,
          });
        } else {
          console.log("Usuário não possui telefone cadastrado.", userData);
          emit("toggleForm");
        }
      } else {
        console.log("Usuário não encontrado no Firestore.");
        emit("toggleForm");
      }
    }
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Erro no login:", error);
  }
};

// Form State

// Error State
const errors = reactive({
  name: "",
  email: "",
  telefone: "",
  role: "",
});

// Emits
const emit = defineEmits(["submit", "toggleForm", "cadastroComplete"]);

// Validate functions
const validateName = (name: string) => {
  const regex = /^[A-Za-zÀ-ÿ]+(?:\s+[A-Za-zÀ-ÿ]+)+$/;
  if (!regex.test(name)) {
    return "Informe nome e sobrenome, sem números ou símbolos.";
  }
  return "";
};

const validateEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "Email inválido.";
  }
  return "";
};

const validateTelefone = (telefone: string) => {
  const regex = /^\(\d{2}\)\s\d{5}-\d{4}$/;
  if (!regex.test(telefone)) {
    return "Telefone inválido.";
  }
  return "";
};

const validateRole = (role: string) => {
  if (role === "") {
    return "Selecione uma opção.";
  }
  return "";
};

const formatTel = (tel: string) => {
  const regex = /(\d{2})(\d{5})(\d{4})/;
  const formatted = tel.replace(regex, "($1) $2-$3");
  form.telefone = formatted;
};

// Submit
const handleSubmit = () => {
  errors.name = props.isSignUp ? validateName(form.name) : "";
  errors.email = props.isSignUp ? validateEmail(form.email) : "";
  errors.telefone = props.isSignUp ? validateTelefone(form.telefone) : "";
  errors.role = props.isSignUp ? validateRole(form.role) : "";

  const hasErrors = Object.values(errors).some((err) => err !== "");
  if (hasErrors) {
    return;
  }

  emit("submit", { ...form });
};

// Toggle between login/signup
const toggleForm = () => {
  emit("toggleForm");
};

onMounted(() => {
  if (userStore.user) {
    form.name = userStore.user?.name ?? "";
    form.email = userStore.user?.email ?? "";
  }
});
</script>
