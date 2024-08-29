# Shopper - Teste Técnico – Desenvolvimento Web

URL: http://localhost:3000

Imagem de teste convertida para base64:

![Shopper backend](https://github.com/gabriel-tomas/shopper-leitura-agua-gas-backend/blob/main/assets/imagetest.jpg?raw=true)

Exemplo funcionando:

![Shopper backend](https://github.com/gabriel-tomas/shopper-leitura-agua-gas-backend/blob/main/assets/usage.gif?raw=true)

Para iniciar tudo:
```
sudo docker-compose up
```
ou dependendo de sua config, somente:
```
docker-compose up
```

## O que usei 
- Node.Js
- TypeScript
- Knex (SQL query builder)
- MariaDB (estava utilizando no Docker a imagem MySQL 5.7, porém troquei para MariaDB. imagem MySQL 5.7 estava com uns problemas, dando problema de timeout ao ser construido no Docker)

## Vai aparecer assim quando o app estiver pronto

![Shopper backend](https://github.com/gabriel-tomas/shopper-leitura-agua-gas-backend/blob/main/assets/success.png?raw=true)

## <del>Adendos sobre o Docker</del>
- <del>Eu não sei muito bem usar o Docker</del>
- <del>Estou utilizando um script **wait-for-db.sh** para a aplicação esperar o database subir para a aplicação instalar as depêndencias, rodar os migrates e subir a aplicação em http://localhost:3000</del>

## <del>Problemas com o Docker</del>
<s>Tive problemas com:</s>

<pre><code><del>
ERROR: for db  UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60)

ERROR: An HTTP request took too long to complete. Retry with --verbose to obtain debug information.

If you encounter this issue regularly because of slow network conditions, consider setting COMPOSE_HTTP_TIMEOUT to a higher value (current value: 60).
</del></code></pre>

### Possível solução:

<del>No meu caso o que mais deu certo foi</del>

<pre><code><del>
sudo docker-compose down -v
sudo docker-compose up
</del></code></pre>

<del>Executar um após o outro.</del>

<del>Basicamente remover os containers, networks e volumes do projeto dai subir eles de volta.</del>

### Outra solução, de acordo com algumas issues

<del>Não sei se é o meu PC que é fraco (provavelmente), mas para resolver esse problema, segundo algumas issues abertas no GitHub tem que rodar:</del>

<pre><code><del>
export DOCKER_CLIENT_TIMEOUT=120
export COMPOSE_HTTP_TIMEOUT=120
</del></code></pre>

<del>Restartar ou aumentar o Docker CPU e memória são possíveis soluções.</del> 

<del>Issue: https://github.com/docker/compose/issues/3927</del>