export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    const role = userStore.user?.role;
    const versionStore = useVersionStore();

    

    if(to.path === '/') {
        const cookie = getCookie("versao");
        if (cookie == "B") versionStore.setVersion("B");
        console.log("Versão:", versionStore.getVersion, cookie);
        return;
    }

    if (!role) {
        return navigateTo('/');
    }

    if (to.path.startsWith('/admin') && role !== 'admin') {
        console.log('User is not an admin, redirecting to home page...', role, to.path);
        return navigateTo('/');
    }

    if (to.path.startsWith('/owner') && role !== 'owner') {
        return navigateTo('/');
    }

    if (to.path.startsWith('/judge') && !(role === 'judge' || role === 'admin')) {
        return navigateTo('/');
    }

    if (to.path.startsWith('/user') && role !== 'user') {
        return navigateTo('/');
    }
});

function getCookie(name: string) {
    const nameEq = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(nameEq) === 0) return c.substring(nameEq.length, c.length);
    }
    return "";
}