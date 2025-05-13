# futPro
em geral esta funcional, mas o navbar por exemplo tem dois botões que não usa para nada, não tem botões de retornos a processos anteriores, tem telas feitas que não tem como ter acesso, então antes de criarmos coisas novas vamos refinir o que ja temos

/pages
  /admin
    home.vue - ok
    tournaments.vue - ok
    create-tournament.vue - ok
    manage-tournament.vue - (falta aprovar juiz)
    profile
    matches (visualizar proximas partidas) - ok
    (tem acesso a tudo que juiz tem)
  /owner
    home.vue - ok
    tournaments.vue - ok
    create-team.vue - ok
    profile
    create-player.vue - ok
    matches (visualizar proximas partidas) - ok
  /judge
  precisa melhorar a aparencia do app e o fluxo
    home.vue - ok
    start-match.vue - ok
    profile
    add-event.vue - ok
    tournaments.vue (solicitar para ser juiz)
    matches (visualizar proximas partidas)
  /user
    home.vue
    tournaments.vue
    teams.vue - ok
    profile.vue - ok
    matches (visualizar proximas partidas) - ok

/views
  LoginView - ok
  SingUpView - ok
  ....

/layouts
  admin-layout.vue - ok
  owner-layout.vue - ok
  judge-layout.vue - ok
  user-layout.vue - ok

/components
  Button.vue
  TournamentCard.vue - ok
  TeamCard.vue
  PlayerCard.vue
  MatchCard.vue
  Navbar.vue - ok
  Modal - ok

/middleware
  auth.ts
  role-check.ts - ok

/store
  useUserStore.ts -ok
