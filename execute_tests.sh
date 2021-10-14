docker-compose -f docker/docker-compose.yml down --rmi all
docker-compose -f docker/docker-compose.yml up -d influxdb grafana
echo "--------------------------------------------------------------------------------------"
echo "Performance testing with Grafana dashboard http://localhost:3000/d/k6/k6-load-testing-results"
echo "--------------------------------------------------------------------------------------"
docker-compose -f docker/docker-compose.yml run --rm k6 run /tests/tests.js
