#!/usr/bin/env zx

import 'zx/globals'

// Claude Code Experiments Setup Script (TypeScript + zx)
$.verbose = true

interface ServiceConfig {
  name: string
  port: number
  healthCheck: () => Promise<boolean>
  url?: string
  consoleUrl?: string
}

async function main() {
  console.log('🚀 Setting up Claude Code Experiments environment...')

  // Check if .env exists
  const envExists = await fs.pathExists('.env')
  if (!envExists) {
    console.log('📝 Creating .env file from template...')
    await fs.copy('.env.template', '.env')
    console.log('⚠️  Please edit .env file with your actual credentials:')
    console.log('   - GITLAB_TOKEN: Your GitLab personal access token')
    console.log('   - MINIO_ROOT_PASSWORD: Your preferred MinIO password')
    console.log('   - Other settings as needed')
    console.log('')
    
    // Wait for user input
    const input = await question('Press Enter to continue after editing .env file...')
  }

  // Install dependencies
  console.log('📦 Installing dependencies...')
  await $`bun install`

  // Start Docker services
  console.log('🐳 Starting Docker services...')
  await $`docker compose up -d`

  // Wait for services to be ready
  console.log('⏳ Waiting for services to start...')
  await sleep(10000) // 10 seconds

  // Load environment variables
  const env = dotenv.parse(await fs.readFile('.env', 'utf8'))
  
  // Define services with their health checks
  const services: ServiceConfig[] = [
    {
      name: 'MinIO',
      port: parseInt(env.MINIO_PORT || '9000'),
      url: `http://localhost:${env.MINIO_PORT || '9000'}`,
      consoleUrl: `http://localhost:${env.MINIO_CONSOLE_PORT || '9001'}`,
      healthCheck: async () => {
        try {
          const response = await fetch(`http://localhost:${env.MINIO_PORT || '9000'}/minio/health/live`)
          return response.ok
        } catch {
          return false
        }
      }
    },
    {
      name: 'Redis',
      port: parseInt(env.REDIS_PORT || '6379'),
      healthCheck: async () => {
        try {
          await $`docker exec redis-backend redis-cli ping`
          return true
        } catch {
          return false
        }
      }
    },
    {
      name: 'SurrealDB',
      port: parseInt(env.SURREALDB_PORT || '8000'),
      url: `http://localhost:${env.SURREALDB_PORT || '8000'}`,
      healthCheck: async () => {
        try {
          const response = await fetch(`http://localhost:${env.SURREALDB_PORT || '8000'}/health`)
          return response.ok
        } catch {
          return false
        }
      }
    },
    {
      name: 'SurrealMCP',
      port: parseInt(env.SURREALDB_MCP_PORT || '3004'),
      url: `http://localhost:${env.SURREALDB_MCP_PORT || '3004'}`,
      healthCheck: async () => {
        try {
          // Check if the HTTP port is responding
          const response = await fetch(`http://localhost:${env.SURREALDB_MCP_PORT || '3004'}`, { 
            method: 'HEAD',
            timeout: 3000 
          });
          return response.status < 500; // Accept any non-5xx status
        } catch {
          return false
        }
      }
    }
  ]

  // Check service health
  console.log('🔍 Checking service health...')
  
  for (const service of services) {
    const isHealthy = await service.healthCheck()
    
    if (isHealthy) {
      console.log(`✅ ${service.name} is running on port ${service.port}`)
      if (service.url) {
        console.log(`   URL: ${service.url}`)
      }
      if (service.consoleUrl) {
        console.log(`   Console: ${service.consoleUrl}`)
      }
    } else {
      console.log(`❌ ${service.name} health check failed`)
    }
  }

  console.log('')
  console.log('🎉 Setup complete! You can now:')
  console.log('   1. Restart Claude Code to reload MCP configuration')
  console.log('   2. Run /mcp to verify all servers are connected')
  console.log('   3. Use MinIO, Redis, and SurrealDB through Claude Code (with official SurrealMCP)')
  console.log('')
  console.log('📚 Useful commands:')
  console.log('   docker compose logs -f        # View service logs')
  console.log('   docker compose down          # Stop services')
  console.log('   docker compose up -d         # Start services')
  console.log('   bun start.ts                 # Run this setup script')
}

// Helper function to sleep
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

// Load dotenv manually since zx doesn't include it by default
const dotenv = {
  parse: (src: string): Record<string, string> => {
    const result: Record<string, string> = {}
    for (const line of src.split('\n')) {
      const trimmed = line.trim()
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...valueParts] = trimmed.split('=')
        if (key && valueParts.length > 0) {
          result[key.trim()] = valueParts.join('=').trim()
        }
      }
    }
    return result
  }
}

// Run the main function
await main().catch(error => {
  console.error('❌ Setup failed:', error.message)
  process.exit(1)
})