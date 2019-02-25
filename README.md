# naics-search
Sample for NAICS Search service, based on @triestpa's Guttenberg Search example https://blog.patricktriest.com/text-search-docker-elasticsearch/

As the search is currently configured/implemented, it does "fuzzy" searching. So if you search on "beer", you will see matches for "beet", "bees", and "deer" (and maybe some others that are close). The matched words are highlighed in the output.

The fuzzy search (as configured) does not match partial words (unless really close to the full word). So "bee production" will return 6 hits (including matching "bees" and "beet"), but "bee prod" matches nothing. On the upside, typing "kilm" matches "kiln".

The data loaded into ElasticSearch is persisted into a Docker-managed volume (see it useing `docker volume list`) and will persist between container restarts.

##Pre-requisites:
er, you'll need Docker installed.
Then clone this repo to a local directory and CD into it.

##Start services:
`docker-compose up -d --build`

This will automatically build containers on first use and build any that are out-of-date on subsequent invocations. So if you change any of the code, use that command to rebuild changed containers and start them. It is not necessary to stop containers for this to work -- changed containers will be replaced.

##Load data into container:
`docker exec naics-search-api "node" "server/load_data.js"`

##Access webUI:
http://localhost:8080/

Search away!

##Postscript:
To stop containers, use `docker-compose stop`
To start without rebuilding, use `docker-compose start`

To entirely remove the project from your system:
- `docker-compose down`
- `docker volume prune` (will remove any unused volumes!)
- delete the directory you cloned everything into

Data preparation:
In my first version of this, I processed the NAICS CSV into a text file compatible with bulkloading to ElasticSearch and did the bulkload via Postman.

It would be cleaner to have load_data.js do all of this, but since it was already working, I just included the original CSV file and the little node.js utility for processing the file in the `naics` subdirectory. You shouldn't need to use that.

