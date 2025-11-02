#!/bin/bash

models=(
  user site typeparc parc typeconsommationlub typeconsommationlubParc lubrifiantParc engin
  typepanne typepanneParc panne saisiehrm saisiehim typelubrifiant lubrifiant saisielubrifiant objectif
)

for model in "${models[@]}"; do
  nest g resource $model --no-spec
done
