import { defineStore } from "pinia";

type Version = 'A' | 'B'

export const useVersionStore = defineStore("version", () => {
    const version = ref("A");

    const setVersion = (newVersion: Version) => {
        version.value = newVersion;
    }

    const getVersion = computed(() => {
        return version.value;
    });

    return {
        setVersion,
        getVersion
    }
});
