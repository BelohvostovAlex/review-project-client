build: 
	docker build -t client-app . -f Dockerfile.dev

build-production:
	docker build -t client-app-production -f Dockerfile.production