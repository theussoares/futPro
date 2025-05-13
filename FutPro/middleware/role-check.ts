export default defineNuxtRouteMiddleware((to, from) => {
    const userStore = useUserStore();
    const versionStore = useVersionStore();
    const role = userStore.user?.role;

    if(to.params?.version === 'B') {
        versionStore.setVersion(to.params.version);
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
