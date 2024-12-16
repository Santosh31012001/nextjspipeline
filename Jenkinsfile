pipeline {
    agent any
    tools {
        nodejs 'node-18'
    }
    environment {
        DEPLOY_SERVER = '82.112.226.198'  // Server hostname
        DEPLOY_USER = 'root'              // Server's user
        DEPLOY_PATH = '/root/jenkinswork/nextjspipeline'   // Directory on your server
        CREDENTIALS_ID = 'clouldplaysolution'   // Jenkins credentials ID for username-password
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
                    withCredentials([usernamePassword(credentialsId: 'clouldplaysolution', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                        sh '''
                            sshpass -p $PASSWORD ssh -o StrictHostKeyChecking=no $USERNAME@${DEPLOY_SERVER} << EOF
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
