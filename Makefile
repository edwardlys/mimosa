start: build up npm-build

build:
	docker-compose build

up:
	docker-compose up -d

app-build:
	docker-compose exec app npm run build

app-sh:
	docker-compose exec app sh
