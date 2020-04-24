start-dev: build-dev up-dev

build-dev:
	docker-compose build

up-dev:
	docker-compose up -d


start-prod: build-prod up-prod

build-prod:
	docker-compose -f docker-compose.yml -f docker-compose.production.yml build

up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d

