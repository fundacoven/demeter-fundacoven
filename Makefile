# Nombre de los archivos docker-compose
COMPOSE_DEV_FILE=docker-compose.dev.yml
COMPOSE_PROD_FILE=docker-compose.prod.yml

# Nombre del proyecto para docker-compose
PROJECT_NAME=ucabiot

# Comandos de desarrollo
up-dev:
	@echo "Levantando los contenedores en modo desarrollo..."
	docker-compose -f $(COMPOSE_DEV_FILE) -p $(PROJECT_NAME)_dev up --build

down-dev:
	@echo "Bajando los contenedores en modo desarrollo..."
	docker-compose -f $(COMPOSE_DEV_FILE) -p $(PROJECT_NAME)_dev down

logs-dev:
	@echo "Mostrando logs de los contenedores en modo desarrollo..."
	docker-compose -f $(COMPOSE_DEV_FILE) -p $(PROJECT_NAME)_dev logs -f

restart-dev:
	@echo "Reiniciando los contenedores en modo desarrollo..."
	docker-compose -f $(COMPOSE_DEV_FILE) -p $(PROJECT_NAME)_dev restart

build-dev:
	@echo "Construyendo las imágenes en modo desarrollo..."
	docker-compose -f $(COMPOSE_DEV_FILE) -p $(PROJECT_NAME)_dev build

clean-dev:
	@echo "Limpiando los contenedores en modo desarrollo..."
	docker-compose -f $(COMPOSE_DEV_FILE) -p $(PROJECT_NAME)_dev down --volumes

destroy-dev:
	@echo "Destruyendo los contenedores en modo desarrollo..."
	docker-compose -f $(COMPOSE_DEV_FILE) -p $(PROJECT_NAME)_dev down --volumes --rmi all

# Comandos de producción
up-prod:
	@echo "Levantando los contenedores en modo producción..."
	docker-compose -f $(COMPOSE_PROD_FILE) -p $(PROJECT_NAME)_prod up -d --build

down-prod:
	@echo "Bajando los contenedores en modo producción..."
	docker-compose -f $(COMPOSE_PROD_FILE) -p $(PROJECT_NAME)_prod down

logs-prod:
	@echo "Mostrando logs de los contenedores en modo producción..."
	docker-compose -f $(COMPOSE_PROD_FILE) -p $(PROJECT_NAME)_prod logs -f

restart-prod:
	@echo "Reiniciando los contenedores en modo producción..."
	docker-compose -f $(COMPOSE_PROD_FILE) -p $(PROJECT_NAME)_prod restart

build-prod:
	@echo "Construyendo las imágenes en modo producción..."
	docker-compose -f $(COMPOSE_PROD_FILE) -p $(PROJECT_NAME)_prod build

clean-prod:
	@echo "Limpiando los contenedores en modo producción..."
	docker-compose -f $(COMPOSE_PROD_FILE) -p $(PROJECT_NAME)_prod down --volumes

destroy-prod:
	@echo "Destruyendo los contenedores en modo producción..."
	docker-compose -f $(COMPOSE_PROD_FILE) -p $(PROJECT_NAME)_prod down --volumes --rmi all

# Comando por defecto
.PHONY: help
help:
	@echo "Uso del Makefile:"
	@echo "  up-dev         - Levantar los contenedores en modo desarrollo"
	@echo "  down-dev       - Bajar los contenedores en modo desarrollo"
	@echo "  logs-dev       - Mostrar los logs en modo desarrollo"
	@echo "  restart-dev    - Reiniciar los contenedores en modo desarrollo"
	@echo "  build-dev      - Construir las imágenes en modo desarrollo"
	@echo "  clean-dev      - Limpiar los contenedores en modo desarrollo"
	@echo "  destroy-dev    - Destruye los contenedores en modo desarrollo"
	@echo "  up-prod        - Levantar los contenedores en modo producción"
	@echo "  down-prod      - Bajar los contenedores en modo producción"
	@echo "  logs-prod      - Mostrar los logs en modo producción"
	@echo "  restart-prod   - Reiniciar los contenedores en modo producción"
	@echo "  build-prod     - Construir las imágenes en modo producción"
	@echo "  clean-prod     - Limpiar los contenedores en modo producción"
	@echo "  destroy-prod   - Destruye los contenedores en modo producción"
	