pipeline {
    agent any
    tools {
        nodejs 'node-18'
    }
    environment {
        // Set environment variables for deployment (if any)
        DEPLOY_SERVER = '82.112.226.198'  // server hostname
        DEPLOY_USER = 'root'              // server's user
        DEPLOY_PATH = '/root/jenkinswork/nextjspipeline'   // directory on your server
        PRIVATE_KEY = credentials('c5b8a158-6dea-4360-8951-d371a210ebad') // Jenkins SSH private key
    }
    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Santosh31012001/nextjspipeline.git', branch: 'main'
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npm run test:ci'
            }
        }
        stage('Deploy to AWS EC2') {
            steps {
                // SSH into the server and deploy
                script {
                    sshagent([PRIVATE_KEY]) {
                        sh '''
                            # Connect to the server and deploy the app
                            ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} << 'EOF'
                                # Navigate to the deployment directory
                                cd ${DEPLOY_PATH}
                                
                                # Pull the latest code (optional if using Git for deployment)
                                git pull origin main
                                
                                # Install dependencies on the server
                                npm install --production
                                
                                # Build the application (if not pre-built)
                                npm run build
                                
                                # Restart the Next.js application (if using pm2 or similar process manager)
                                pm2 restart nextjs-app || pm2 start npm --name "nextjs-app" -- start
                            EOF
                        '''
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Pipeline completed successfully! Application deployed.'
        }
        failure {
            echo 'Pipeline failed. Check the logs for details.'
        }
    }
}
