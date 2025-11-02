const { execSync } = require('child_process');

const resources = [
  'site',
  'typeparc',
  'parc',
  'typeconsommationlub',
  'typeconsommationlubParc',
  'lubrifiantParc',
  'engin',
  'typepanne',
  'typepanneParc',
  'panne',
  'saisiehrm',
  'saisiehim',
  'typelubrifiant',
  'lubrifiant',
  'saisielubrifiant',
  'objectif',
  'rapport',
];

resources.forEach((r) => {
  console.log(`✨ Génération de la ressource: ${r}`);
  execSync(`nest g resource ${r}`, { stdio: 'inherit' }); // interactif obligatoire
});

console.log('✅ Génération terminée !');
