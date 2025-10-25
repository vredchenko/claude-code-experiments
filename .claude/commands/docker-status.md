# Docker Services Status

Show the status of all docker compose services and their health checks.

1. Run `docker compose ps` to show all services and their status
2. For any services that are unhealthy or have issues, run
   `docker compose logs --tail=20 <service>` to show recent logs
3. Show resource usage with `docker stats --no-stream` for running containers
4. Provide a summary of:
   - Total services running/stopped
   - Any health check failures
   - Recent error messages in logs

Format the output as a clear status report.
