pipeline {
    agent any
    tools {
        nodejs 'node-18'
    }
    environment {
        DEPLOY_SERVER = '82.112.226.198'  // server hostname
        DEPLOY_USER = 'root'              // server's user
        DEPLOY_PATH = '/root/jenkinswork/nextjspipeline'   // directory on your server
        PRIVATE_KEY_ID = 'c5b8a158-6dea-4360-8951-d371a210ebad' // Jenkins SSH private key ID
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
        stage('Deploy to clouldplayserver') {
            steps {
                script {
                    sshagent([PRIVATE_KEY_ID]) {
                        sh '''
                            set -e
                            ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} << EOF
                                # Navigate to the deployment directory
                                cd ${DEPLOY_PATH}
                                
                                # Pull the latest code
                                git pull origin main
                                
                                # Install dependencies
                                npm install --production
                                
                                # Build the application
                                npm run build
                                
                                # Restart the Next.js application
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
