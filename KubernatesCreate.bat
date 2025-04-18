@echo off
echo Iniciando limpeza do ambiente lanchonetews...

echo 1. Deletando todos os recursos no namespace lanchonetews...
kubectl delete all --all -n lanchonetews
kubectl delete configmap --all -n lanchonetews
kubectl delete secret --all -n lanchonetews
kubectl delete pvc --all -n lanchonetews
kubectl delete job --all -n lanchonetews

echo 2. Desinstalando o release Helm lanchonetews (se existir)...
helm uninstall lanchonetews -n lanchonetews

echo 3. Instalando o chart Helm lanchonetews...
helm install lanchonetews ./kubernetes-chart ^
  --set global.dbUser=admin ^
  --set global.dbPassword=admin@123 ^
  --set global.DB_DATABASE=lanchonete_ws ^
  --namespace lanchonetews

echo Processo concluido!
pause
