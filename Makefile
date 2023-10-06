all:
	@docker-compose up --build
down:
	@docker-compose down
clean: down
	@docker rmi -f $$(docker image ls -q) 2>/dev/null || true
	@docker volume rm $$(docker volume ls -q) 2>/dev/null || true
fclean: clean

re: fclean all
