# Shopper - Teste Técnico – Desenvolvimento Web

URL: http://localhost:3000

Imagem de teste convertida para base64:

![Shopper backend](https://github.com/gabriel-tomas/shopper-leitura-agua-gas-backend/blob/main/assets/imagetest.png?raw=true)

![Shopper backend](https://github.com/gabriel-tomas/shopper-leitura-agua-gas-backend/blob/main/assets/usage.gif?raw=true)

Para iniciar tudo:
```
sudo docker-compose up
```
ou dependendo de sua config, somente:
```
docker-compose up
```

## Adendos sobre o Docker
- Eu não sei muito bem usar o Docker
- Estou utilizando um script **wait-for-db.sh** para a aplicação esperar o database subir para a aplicação instalar as depêndencias, rodar os migrates e subir a aplicação em http://localhost:3000

## Problemas com o Docker
Tive problemas com:
```
ERROR: for db  UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60)

ERROR: An HTTP request took too long to complete. Retry with --verbose to obtain debug information.

If you encounter this issue regularly because of slow network conditions, consider setting COMPOSE_HTTP_TIMEOUT to a higher value (current value: 60).
```

### Possível solução:

No meu caso o que mais deu certo foi

```
sudo docker-compose down -v
sudo docker-compose up
```

Executar um após o outro.

Basicamente remover os containers, networks e volumes do projeto dai subir eles de volta.

### Outra solução, de acordo com algumas issues

Não sei se é o meu PC que é fraco (provavelmente), mas para resolver esse problema, segundo algumas issues abertas no GitHub tem que rodar:
```
export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120
```

Restartar ou aumentar o Docker CPU e memória são possíveis soluções. 

Issue: https://github.com/docker/compose/issues/3927

## Vai aparecer assim quando o app estiver pronto

![Shopper backend](https://github.com/gabriel-tomas/shopper-leitura-agua-gas-backend/blob/main/assets/success.png?raw=true)